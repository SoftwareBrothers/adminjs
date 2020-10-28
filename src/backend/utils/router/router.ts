import * as path from 'path'
import { outPath as COMPONENT_BUNDLE_PATH } from '../../bundler/user-components-bundler'

import AppController from '../../controllers/app-controller'
import ApiController from '../../controllers/api-controller'
import env from '../../bundler/bundler-env'

const ASSETS_ROOT = `${__dirname}/../../../frontend/assets/`

/**
 * Type representing the AdminBro.Router
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
    src: path.join(ASSETS_ROOT, `scripts/app-bundle.${env}.js`),
  }, {
    path: '/frontend/assets/global.bundle.js',
    src: path.join(ASSETS_ROOT, `scripts/global-bundle.${env}.js`),
  }, {
    path: '/frontend/assets/design-system.bundle.js',
    src: path.join(
      path.parse(require.resolve('@admin-bro/design-system')).dir,
      `../bundle.${env}.js`,
    ),
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
    path: '/api/resources/{resourceId}/search/',
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
    src: COMPONENT_BUNDLE_PATH,
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
