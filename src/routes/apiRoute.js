import * as express from 'express';
import {
  getProducts, getProduct, getReviews, addProduct, getUsers, addUser, getProductsnosql, getProductnosql,
  getReviewsnosql, addProductnosql, getUsersnosql, verifyAuth, allRoutes, getCity, getCities,
  addUsernosql,
} from '.';
import controllers from '../controllers';
import verifyAuthentication from '../middlerwares/verifyAuthorization';

export default function registerAPIRoutes(secretCode) {
  const apiRouter = express.Router();
  apiRouter.get(verifyAuth, verifyAuthentication(secretCode));
  // SQL DB API's
  apiRouter.get(getProducts, controllers.products.getAllProducts);
  apiRouter.get(getProduct, controllers.products.getProduct);
  apiRouter.get(getReviews, controllers.products.getReviews);
  apiRouter.post(addProduct, controllers.products.addProduct);
  apiRouter.get(getUsers, controllers.user.getAllUsers);
  apiRouter.post(addUser, controllers.user.addUser);

  // NoSQL DB API's
  apiRouter.get(getCity, controllers.city.getRandomCity);
  apiRouter.get(getCities, controllers.city.getAllCities);
  apiRouter.post(getCities, controllers.city.createCity);
  apiRouter.get(getProductsnosql, controllers.productNoSQL.getAllProducts);
  apiRouter.get(getProductnosql, controllers.productNoSQL.getProduct);
  apiRouter.get(getReviewsnosql, controllers.productNoSQL.getReviews);
  apiRouter.post(addProductnosql, controllers.productNoSQL.addProduct);
  apiRouter.get(getUsersnosql, controllers.userNoSQL.getAllUsers);
  apiRouter.post(addUsernosql, controllers.userNoSQL.addUser);

  apiRouter.get(allRoutes, (req, res) => {
    res.send('INVALID REQUEST');
  });
  return apiRouter;
}
