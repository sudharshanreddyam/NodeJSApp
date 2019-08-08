import productControllers from './products';
import userControllers from './users';
import authencationController from './authentication';

export default {
    products: productControllers,
    user: userControllers,
    authenticate: authencationController
} 