import express from 'express';
import routes from './routes';
import controllers from './controllers';
import cookieParser from './middlerwares/cookieParser';
import queryParser from './middlerwares/queryParser';

const app = express();

app.use(cookieParser);
app.use(queryParser);
app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src 'none'; font-src 'self' data:; style-src 'self' 'unsafe-inline' data:; img-src 'self' data:; script-src 'self' 'unsafe-inline'; connect-src 'self';");
    return next();
});
const router = express.Router();
app.use(router);

router.get('/api/products', controllers.products.getAll);
router.get(routes.getProduct, controllers.products.get);
router.get(routes.getReviews, controllers.products.getReviews);
router.post(routes.addProduct, controllers.products.add);
router.get(routes.getUsers, controllers.user.getAll);

export default app;