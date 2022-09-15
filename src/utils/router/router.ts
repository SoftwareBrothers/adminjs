import ApiController from '../../controllers/api-controller'

export type AdminRoute = {
  method: string;
  path: string;
  Controller: any;
  action: string;
  contentType?: string;
}

/**
 * Type representing the AdminJS.Router
 * @memberof Router
 * @alias RouterType
 */
export type RouterType = {
  routes: Array<AdminRoute>;
}

/**
 * @load ./router.doc.md
 * @namespace
 */
export const Router: RouterType = {
  routes: [{
    method: 'GET',
    path: '/api/resources/{resourceId}/search/{query}',
    Controller: ApiController,
    action: 'search',
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
