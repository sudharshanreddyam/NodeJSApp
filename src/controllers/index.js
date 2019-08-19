import productControllers from './products';
import userControllers from './users';
import authencationController from './authentication';
import cityController from './nosql/cities';
import productControllerNoSQL from './nosql/products';
import userControllerNoSQL from './nosql/users';

export default {
  products: productControllers,
  user: userControllers,
  authenticate: authencationController,
  city: cityController,
  productNoSQL: productControllerNoSQL,
  userNoSQL: userControllerNoSQL,
};
