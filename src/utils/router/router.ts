import AppController from '../../controllers/app-controller'
import ApiController from '../../controllers/api-controller'

/**
 * Type representing the AdminJS.Router
 * @memberof Router
 * @alias RouterType
 */
export type RouterType = {
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
  }, { // Metadata
    method: 'GET',
    path: '/api/metadata',
    Controller: ApiController,
    action: 'metadata',
  }],
}

export default Router
