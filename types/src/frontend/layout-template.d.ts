import AdminJS from '../adminjs';
import { CurrentAdmin } from '../current-admin.interface';
/**
 * Renders (SSR) html for given location
 *
 * @param {AdminJS} admin
 * @param {Object} [currentAdmin]
 * @param {String} currentAdmin.email
 * @param {String} location='/'
 *
 * @private
 */
declare const html: (admin: AdminJS, currentAdmin?: CurrentAdmin, location?: string) => Promise<string>;
export default html;
