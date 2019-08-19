import * as express from 'express';
import { getProducts, getProduct, getReviews, addProduct, getUsers } from '.';
import controllers from '../controllers';
import verifyAuthentication from '../middlerwares/verifyAuthorization';

export default function registerAPIRoutes(secretCode) {
  const apiRouter = express.Router();
  apiRouter.get(getProducts, verifyAuthentication(secretCode), controllers.products.getAllProducts);
  apiRouter.get(getProduct, verifyAuthentication(secretCode), controllers.products.getProduct);
  apiRouter.get(getReviews, verifyAuthentication(secretCode), controllers.products.getReviews);
  apiRouter.post(addProduct, verifyAuthentication(secretCode), controllers.products.addProduct);
  apiRouter.get(getUsers, verifyAuthentication(secretCode), controllers.user.getAllUsers);
  return apiRouter;
}
