/**
 * Currently logged in admin.
 *
 * ### Usage with TypeScript
 *
 * ```typescript
 * import { CurrentAdmin } from 'admin-bro'
 * ```
 *
 * @alias CurrentAdmin
 * @memberof AdminBro
 */
export type CurrentAdmin = {
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
   * Also you can put as many other fields to it as you like.
   */
  [key: string]: any;
}
