import { Store } from 'redux';
import { ReduxState } from './store';
import AdminJS from '../../adminjs';
import { CurrentAdmin } from '../../current-admin.interface';
export declare const initializeStore: (admin: AdminJS, currentAdmin?: CurrentAdmin) => Promise<Store<ReduxState>>;
export default initializeStore;
