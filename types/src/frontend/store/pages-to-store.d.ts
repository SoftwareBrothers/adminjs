import { AdminJSOptions } from '../../adminjs-options.interface';
import { PageJSON } from '../interfaces';
declare const pagesToStore: (pages?: AdminJSOptions['pages']) => Array<PageJSON>;
export default pagesToStore;
