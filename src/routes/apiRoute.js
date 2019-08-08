import * as express from 'express';
import {getProducts, getProduct, getReviews, addProduct, getUsers} from './';
import controllers from '../controllers';
import verifyAuthentication from '../middlerwares/verifyAuthorization';

export default function registerAPIRoutes(secretCode) {
    const apiRouter = express.Router();
    apiRouter.get(getProducts, verifyAuthentication(secretCode), controllers.products.getAll);
    apiRouter.get(getProduct, verifyAuthentication(secretCode), controllers.products.get);
    apiRouter.get(getReviews, verifyAuthentication(secretCode), controllers.products.getReviews);
    apiRouter.post(addProduct, verifyAuthentication(secretCode), controllers.products.add);
    apiRouter.get(getUsers, verifyAuthentication(secretCode), controllers.user.getAll);
    return apiRouter;
}