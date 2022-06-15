/* cspell: disable */
export const DOCS = 'https://docs.adminjs.co'
export const DEFAULT_PATHS = {
  rootPath: '/admin',
  logoutPath: '/admin/logout',
  loginPath: '/admin/login',
}

const DEFAULT_TMP_DIR = '.adminjs'
export const ADMIN_JS_TMP_DIR = typeof process === 'object'
  ? process.env.ADMIN_JS_TMP_DIR || DEFAULT_TMP_DIR
  : DEFAULT_TMP_DIR
