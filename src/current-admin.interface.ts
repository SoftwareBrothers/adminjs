/**
 * Currently logged in admin
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
   * Also you can put as many other fields to it as you like.
   */
  [key: string]: any;

  /**
   * Id of your admin user
   */
  id?: string;
}
