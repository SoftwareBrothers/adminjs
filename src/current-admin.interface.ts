/**
 * Currently logged in admin.
 *
 * ### Usage with TypeScript
 *
 * ```typescript
 * import { CurrentAdmin } from 'adminjs'
 * ```
 *
 * @alias CurrentAdmin
 * @memberof AdminJS
 */
export interface CurrentAdmin {
  /**
   * Admin has one required field which is an email
   */
  email: string;
  /**
   * Optional title/role of an admin - this will be presented below the email
   */
  title?: string;
  /**
   * Optional url for an avatar photo
   */
  avatarUrl?: string;
  /**
   * Id of your admin user
   */
  id?: string;
  /**
   * Optional ID of theme to use
   */
  theme?: string;
  /**
   * Extra metadata specific to given Auth Provider
   */
  _auth?: Record<string, any>;
  /**
   * Also you can put as many other fields to it as you like.
   */
  [key: string]: any;
}
