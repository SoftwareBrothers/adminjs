## AdminBro

<script src="https://cdn.rawgit.com/knsv/mermaid/7.0.0/dist/mermaid.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.rawgit.com/knsv/mermaid/7.0.0/dist/mermaid.css">
<script>mermaid.initialize({startOnLoad:true});</script>

Admin Bro is an Admin Framework for Node - your best Bro in app developement.

Currently it supports only MongoDB (via mongoose).

## How it is built

It is totally separated from any particular nodejs framework. Because of that it can be easily integrated to almost every app.

This is the example flow for hapi.js

<div class="mermaid">
  graph LR
  A[<a href=./examples_hapijs_index.js.html>Hapi.js</a>] -->|<a href=./admin_integrations_hapi.js.html>Mapping Routes</a>| B{<a href=./Routes.html>Routes.js</a>}
  B --> C(DashoardController)
  B --> D(InstancesController)
  E(Renderer)
  C --> E
  D --> E
  F(PUG view)
  E --> F
</div>

## Integration

Example integration for Hapi.js framework can be found [here]{@link examples/hapijs/index.js}. This code uses Hapi.js [integration plugin]{@link admin/integrations/hapi.js}

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

Than each class which inherits {@link AbstractDatabase} can fetch all models present in the database. Each model inherits from {@link AbstractModel}

Each model has multiple [properties]{@link AbstractPorperty} with different types like String, Data, Number etc.

Finally particular database record/document is mapped to {@link AbstractInstance}