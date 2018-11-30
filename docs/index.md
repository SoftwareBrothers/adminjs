## AdminBro

Admin Bro is an Admin Framework for Node - your best Bro in app developement.

Currently it supports only MongoDB (via mongoose).

## How it works

It is totally separated from any particular nodejs framework. Because of that it can be easily integrated to almost every app.

This is the example flow for hapi.js

<div class="mermaid">
  graph LR
  A[<a href=./examples_hapijs_index.js.html>Hapi.js</a>] -->|<a href=./admin_integrations_hapi.js.html>Mapping Routes</a>| B{<a href=./Routes.html>Routes.js</a>}
  B --> C(DashoardController)
  B --> D(ModelsController)
  E(Renderer)
  C --> E
  D --> E
  F(PUG view)
  E --> F
</div>

## Integration with nodejs Frameworks

Example integration for Hapi.js framework can be found [here]{@link examples/hapijs/index.js}. This code uses Hapi.js [integration plugin]{@link admin/integrations/hapi.js}. If you want to write your own implementation you will have to:

- write a plugin/middleware for a particular framework
- map its routing system to AdminBro routes and controllers (see how Hapi does that: {@link admin/integrations/hapi.js})
- checkout if given framework has ORM already supported. If not you will have to create data mapper for it (see below)
- lastly - don't forget to add integration example in examples folder

## Data model

Most important part of the system is its data model. AdminBro can be integrated with multiple ORMs, that is why it has internal abstraction for handling multiple data models.

This is how it looks:

<div class="mermaid">
  graph TD
  A[<a href=./AbstractDatabase.html>AbstractDatabase</a>] -->|has many| B(<a href=./AbstractModel.html>AbstractModel</a>)
  B --> |has many|C(<a href=./AbstractInstance.html>AbstractInstance</a>)
  B --> |has many|D(<a href=./AbstractProperty.html>AbstractProperty</a>)
</div>

First of all [base class]{@link Admin} is used to convert all supported database connections (mongodb, sql-like, etc) to list of databases which interits from {@link AbstractDatabase}. It utilises {@link DatabaseFactory} to construct correct database type.

Then each class which inherits {@link AbstractDatabase} can fetch all models present in the database. Each model inherits from {@link AbstractModel}

Each model has multiple [properties]{@link AbstractPorperty} with different types like String, Data, Number etc.

Finally particular database record/document is mapped to {@link AbstractInstance}

## Integration with ORMs

To create new ORM integration you have to:

- create your implementation of {@link AbstractDatabase}, {@link AbstractModel}, {@link AbstractInstance} and {@link AbstractProperty}
- update {@link DatabaseFactory}
- update examples
- most probably you will also have to update docker-compose to handle new database

<script src="https://cdn.rawgit.com/knsv/mermaid/7.0.0/dist/mermaid.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/knsv/mermaid/7.0.0/dist/mermaid.css">
<script>mermaid.initialize({ startOnLoad: true });</script>