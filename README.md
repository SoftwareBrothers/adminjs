# Admin Bro

An automatic admin interface which can be plugged into your application. You, as a developer, provide database models (like posts, comments, stores, products or whatever else your application uses), and AdminBro generates UI which allows you (or other trusted users) to manage content.

Inspired by: [django admin](https://docs.djangoproject.com), [rails admin](https://github.com/sferik/rails_admin) and [active admin](https://activeadmin.info/).

Check out the example application with mongodb and postgres models here:

login: `test@example.com`
password: `password`

https://admin-bro-example-app.herokuapp.com/admin

# What kind of problems it solves

So you have a working service built in Node.js. It uses (for example) [Hapi.js](https://hapijs.com/) for rendering a couple of REST routes and [mongoose](https://mongoosejs.com/) as the _connector_ to the database.

Everything works fine, but now you would like to:
* see all the data in the app,
* perform custom _business_ actions on objects in the database,
* bootstrap the tables with the _initial_ data,
* build custom report pages,
* allow other team members (not necessary programmers) to see what is going on in the application.

And all these cases can be solved by AdminBro. By adding couple of lines of code you have a running admin interface.

# How it works

* AdminBor uses models which you already have in your ORM, so you don't have to redefine them.
* AdminBro also can be plugged into Node.js framework you already use for rendering it's views.

List of available ORMs and frameworks

* [admin-bro-hapijs](https://github.com/SoftwareBrothers/admin-bro-hapijs) - plugin for [Hapi.js](https://hapijs.com/) framework
* [admin-bro-mongoose](https://github.com/SoftwareBrothers/admin-bro-mngoose) - adapter for [mongoose ODM](https://mongoosejs.com/)
* [admin-bro-sequelizejs](https://github.com/SoftwareBrothers/admin-bro-sequelizejs) - adapter for [sequelize ORM](http://docs.sequelizejs.com/)
* [admin-bro-expressjs](https://github.com/SoftwareBrothers/admin-bro-expressjs) - plugin for Expressjs framework

# Features

* CRUD any data in any resource
* Custom actions
* Form validation based on schema in your resources
* Full featured dashboard with widgets
* Custom resource decorators

# Installation

1. add admin-bro to your package.json: `yarn add admin-bro` and include it in your project: `const AdminBro = require('admin-bro')`
2. depending on your ORM add corresponding adapter:
  * for mongoose: `yarn add admin-bro-mongoose`
  * for sequelize: `yarn add admin-bro-sequelizejs`
3. register the adapter: `AdminBro.registerAdapter(require('admin-bro-mongoose'))`
4. connect with your database and pass it to AdminBro via options:
```
const connection = await mongoose.connect(process.env.MONGO_URL)
const adminBroOptions = {
  databases: [connection],
}
```
4. depending on your nodejs framework install required plugin:
  * for hapijs: `yarn add admin-bro-hapijs`
  * for expressjs: `yarn add admin-bro-expressjs`
6. use choosen plugin to render AdminBro:
```
const AdminBroPlugin = require('admin-bro-hapijs')
const server = Hapi.server({ port: process.env.PORT || 8080 })
await server.register({ plugin: AdminBroPlugin, options: adminBroOptions })
await server.start()
```

## An example admin application

Here is an one file example of how to connect AdminBro with mongoose and render it via Hapi.js:

```javascript
// index.js
const AdminBro = require('admin-bro')

// We will use mongoose ORM - so let's require its adapter
const AdminBroMongoose = require('admin-bro-mongoose')

// We require hapijs plugin which renders adminBro using this framework
const AdminBroPlugin = require('admin-bro-hapijs')

// Other dependencies
const mongoose = require('mongoose')
const Hapi = require('hapi')

AdminBro.registerAdapter(AdminBroMongoose)

// Let's define a collection:
mongoose.model('Admin', new mongoose.Schema({
  email: String,
  name: String,
  nickName: String,
  password: String,
}))

const rootPath = '/admin'

const start = async () => {
  try {
    // we are running hapijs server as a rendering framework
    const server = Hapi.server({ port: process.env.PORT || 8080 })
    const connection = await mongoose.connect(process.env.MONGO_URL)

    // the simplest admin options - read about all options below
    const adminBroOptions = {
      databases: [connection], // we are passing mongoose database connection
      branding: {
        companyName: 'Amazing c.o.',
      },
      rootPath,
    }
    await server.register({
      plugin: AdminBroPlugin,
      options: adminBroOptions,
    })

    await server.start()
    console.log('Admin running at:', [server.info.uri, rootPath].join(''))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
```

In order to run it you will have to install all the following dependencies:

```bash
yarn install --save admin-bro admin-bro-mongoose admin-bro-hapijs mongoose hapi
```

and then (assuming that you have mongoDB running on port 27017):

```bash
MONGO_URL=mongodb://localhost:27017/hapi-admin node index.js
```

and this is what you get after visiting http://localhost:8080/admin

<img src="./screenshots/simpleapp.png">

### Full featured example

Code of advanced example app using AdminBro (which you can see on https://admin-bro-example-app.herokuapp.com/admin) can be found here: https://github.com/SoftwareBrothers/admin-bro-example-app

## What next

So since now you know the basics, it is the time for more advanced topics:

* [List of all AdminBro options](https://softwarebrothers.github.io/admin-bro/global.html#AdminBroOptions)
* [Resource customization](https://softwarebrothers.github.io/admin-bro/tutorial-resource-decorators.html)
* [Custom dashboard](https://softwarebrothers.github.io/admin-bro/tutorial-custom-dashboard.html)

## License

AdminBro is Copyright © 2018 SoftwareBrothers.co. It is free software, and may be redistributed under the terms specified in the [LICENSE](LICENSE) file.

## About SoftwareBrothers.co

<img src="https://softwarebrothers.co/assets/images/software-brothers-logo-full.svg" width=240>


We’re an open, friendly team that helps clients from all over the world to transform their businesses and create astonishing products.

* We are available to [hire](https://softwarebrothers.co/contact).
* If you want to work for us - checkout the [career page](https://softwarebrothers.co/career).
