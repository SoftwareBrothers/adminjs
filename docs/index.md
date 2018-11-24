## AdminBro

Admin Bro is an Admin Framework for Node - your best Bro in app developement.

Currently it supports only MongoDB (via mongoose).

## How it is built

It is totally separated from any particular nodejs framework. Because of that it can be easily integrated to almost every app.

## Integration

Example integration for Hapi.js framework can be found [here]{@link examples/hapijs/index.js}. This code uses Hapi.js [integration plugin]{@link admin/integrations/hapi.js}

## Data model

Most important part of the system is its data model. AdminBro can be integrated with multiple ORMs, that is why it has internal abstraction for handling multiple data models.

First of all [base class]{@link Admin} is used to convert all supported database connections (mongodb, sql-like, etc) to list of databases which interits from {@link AbstractDatabase}. It utilises {@link DatabaseFactory} to construct correct database type.

Than each class which inherits {@link AbstractDatabase} can fetch all models present in the database. Each model inherits from {@link AbstractModel}

Each model has multiple [properties]{@link AbstractPorperty} with different types like String, Data, Number etc.

Finally particular database record/document is mapped to {@link AbstractInstance}