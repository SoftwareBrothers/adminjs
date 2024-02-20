import path from 'path'

export const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const DEFAULT_TMP_DIR = '.adminjs'
export const ADMIN_JS_TMP_DIR = typeof process === 'object'
  ? process.env.ADMIN_JS_TMP_DIR || DEFAULT_TMP_DIR
  : DEFAULT_TMP_DIR

export const COMPONENTS_ENTRY_PATH = path.join(ADMIN_JS_TMP_DIR, 'entry.js')
export const COMPONENTS_OUTPUT_PATH = path.join(ADMIN_JS_TMP_DIR, 'bundle.js')
