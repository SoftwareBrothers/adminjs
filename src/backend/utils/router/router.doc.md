Contains a list of all the routes used in AdminBro. They are grouped within 2 arrays:

- `assets`
- `routes`

It is used by supported HTTP frameworks to render AdminBro pages. You can also use it to write your
own rendering logic.

### How it looks

This is the structure of the Router - both `assets` and `routes`.
 
```javascript
{
  assets: [{
    path: '/frontend/assets/app.min.js',
    src: path.join(ASSETS_ROOT, 'scripts/app.min.js'),
  }, ...],
  routes: [{
    method: 'GET',
    path: '/resources/{resourceId}',
    Controller: ResourcesController,
    action: 'index',
  }, ...]
}
```

### Create router with authentication logic

To create your router with authentication logic you have to:

* write routes responsible for user authentication
* iterate all `assets` and `routes` and handle them.


The following code is almost an identical copy from @admin-bro/express plugin.js file. It shows you
how you can assign all the routes to express framework.

```javascript
const { Router } = require('admin-bro')

const { routes, assets } = Router
const router = new express.Router()

// here you can write your authentication logic

routes.forEach((route) => {
  // we have to change routes defined in AdminBro from {recordId} to :recordId
  const expressPath = route.path.replace(/{/g, ':').replace(/}/g, '')
  
  const handler = async (req, res, next) => {
    try {
      const currentAdmin = null // you can fetch admin from session, 

      const controller = new route.Controller({ admin }, currentAdmin)
      const { params, query } = req
      const method = req.method.toLowerCase()
      const payload = {
        ...(req.fields || {}),
        ...(req.files || {}),
      }
      const html = await controller[route.action]({
        ...req,
        params,
        query,
        payload,
        method,
      }, res)
      if (route.contentType) {
        res.set({ 'Content-Type': route.contentType })
      }
      if (html) {
        res.send(html)
      }
    } catch (e) {
      next(e)
    }
  }

  if (route.method === 'GET') {
    router.get(expressPath, handler)
  }

  if (route.method === 'POST') {
    router.post(expressPath, handler)
  }
})

assets.forEach((asset) => {
  router.get(asset.path, async (req, res) => {
    res.sendFile(path.resolve(asset.src))
  })
})
```