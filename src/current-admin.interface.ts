/**
 * Currently logged in admin
 *
 * @alias CurrentAdmin
 * @memberof AdminBro
 */
export default interface CurrentAdmin {
  /**
   * Admin has one required field which is an email
   */
  email: string;
  /**
   * Also you can put as many other fields to it as you like.
   */
  [key: string]: any;
}
