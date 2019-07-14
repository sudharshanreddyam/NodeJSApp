import config from './config/config';
import { User, Product } from './models';
import DirWatcher from './dirWatcher';
import Importer from './importer';

const UserObj = new User();
const ProductObj = new Product();
const dirWatcher = new DirWatcher();
const importer = new Importer(dirWatcher);

const dataDir = 'data';
const delay = 2000;

dirWatcher.watch(dataDir, delay);