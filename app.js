import Config from './config/config';
import { User, Product} from './models/models';

class App {
    constructor() {
        console.log(Config.name);
        const UserObj = new User();
        const ProductObj = new Product();
    }
}

const app = new App();