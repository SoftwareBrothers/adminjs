import path from 'path'
import * as url from 'url'
import { createRequire } from 'node:module'

import AppController from '../../controllers/app-controller.js'
import ApiController from '../../controllers/api-controller.js'
import { COMPONENTS_OUTPUT_PATH, NODE_ENV } from '../../bundler/utils/constants.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const ASSETS_ROOT = `${__dirname}/../lib/../../../frontend/assets/`

/**
 * A function which resolves the path to AdminJS design system bundle.
 *
 * @returns {string}  resolved path to AdminJS design system bundle
 */
const resolveDesignSystemBundle = (): string => {
  const require = createRequire(import.meta.url)

  return path.join(
    path.parse(require.resolve('@adminjs/design-system')).dir,
    `../bundle.${NODE_ENV}.js`,
  )
}

/**
 * Type representing the AdminJS.Router
 * @memberof Router
 * @alias RouterType
 */
export type RouterType = {
  assets: Array<{
    path: string;
    src: string;
  }>;
  routes: Array<{
    method: string;
    path: string;
    Controller: any;
    action: string;
    contentType?: string;
  }>;
}

/**
 * @load ./router.doc.md
 * @namespace
 */
export const Router: RouterType = {
  assets: [{
    path: '/frontend/assets/icomoon.css',
    src: path.join(ASSETS_ROOT, 'styles/icomoon.css'),
  }, {
    path: '/frontend/assets/icomoon.eot',
    src: path.join(ASSETS_ROOT, 'fonts/icomoon.eot'),
  }, {
    path: '/frontend/assets/icomoon.svg',
    src: path.join(ASSETS_ROOT, 'fonts/icomoon.svg'),
  }, {
    path: '/frontend/assets/icomoon.ttf',
    src: path.join(ASSETS_ROOT, 'fonts/icomoon.ttf'),
  }, {
    path: '/frontend/assets/icomoon.woff',
    src: path.join(ASSETS_ROOT, 'fonts/icomoon.woff'),
  }, {
    path: '/frontend/assets/app.bundle.js',
    src: path.join(ASSETS_ROOT, `scripts/app-bundle.${NODE_ENV}.js`),
  }, {
    path: '/frontend/assets/global.bundle.js',
    src: path.join(ASSETS_ROOT, `scripts/global-bundle.${NODE_ENV}.js`),
  }, {
    path: '/frontend/assets/design-system.bundle.js',
    src: resolveDesignSystemBundle(),
  }, {
    path: '/frontend/assets/logo.svg',
    src: path.join(ASSETS_ROOT, 'images/logo.svg'),
  }, {
    path: '/frontend/assets/logo-mini.svg',
    src: path.join(ASSETS_ROOT, 'images/logo-mini.svg'),
  }],
  routes: [{
    method: 'GET',
    path: '',
    Controller: AppController,
    action: 'index',
  }, {
    method: 'GET',
    path: '/resources/{resourceId}',
    Controller: AppController,
    action: 'resource',
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/search/{query}',
    Controller: ApiController,
    action: 'search',
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/actions/{action}',
    Controller: AppController,
    action: 'resourceAction',
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/actions/{action}',
    Controller: ApiController,
    action: 'resourceAction',
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/actions/{action}/{query}',
    Controller: ApiController,
    action: 'resourceAction',
  }, {
    method: 'POST',
    path: '/api/resources/{resourceId}/actions/{action}',
    Controller: ApiController,
    action: 'resourceAction',
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/records/{recordId}/{action}',
    Controller: AppController,
    action: 'recordAction',
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/records/{recordId}/{action}',
    Controller: ApiController,
    action: 'recordAction',
  }, {
    method: 'POST',
    path: '/api/resources/{resourceId}/records/{recordId}/{action}',
    Controller: ApiController,
    action: 'recordAction',
  }, {
    method: 'GET',
    path: '/resources/{resourceId}/bulk/{action}',
    Controller: AppController,
    action: 'bulkAction',
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/bulk/{action}',
    Controller: ApiController,
    action: 'bulkAction',
  }, {
    method: 'POST',
    path: '/api/resources/{resourceId}/bulk/{action}',
    Controller: ApiController,
    action: 'bulkAction',
  }, {
    method: 'GET',
    path: '/api/resources/{resourceId}/search',
    Controller: ApiController,
    action: 'search',
  }, {
    method: 'GET',
    path: '/api/dashboard',
    Controller: ApiController,
    action: 'dashboard',
  },
  // Pages
  {
    method: 'GET',
    path: '/pages/{pageName}',
    Controller: AppController,
    action: 'page',
  }, {
    method: 'GET',
    path: '/api/pages/{pageName}',
    Controller: ApiController,
    action: 'page',
  }, {
    method: 'POST',
    path: '/api/pages/{pageName}',
    Controller: ApiController,
    action: 'page',
  }],
}

if (process.env.NODE_ENV === 'production') {
  Router.assets.push({
    path: '/frontend/assets/components.bundle.js',
    src: COMPONENTS_OUTPUT_PATH,
  })
} else {
  Router.routes.push({
    method: 'GET',
    path: '/frontend/assets/components.bundle.js',
    Controller: AppController,
    action: 'bundleComponents',
    contentType: 'text/javascript;charset=utf-8',
  })
}

export default Router
