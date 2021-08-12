## The AdminJS Data model

Before you dive into the details of the flat helpers, let me briefly introduce the way how the
database data is stored in AdminJS.

### The Simple Case

On the backend all the information from DataBase tables/collections goes to {@BaseRecord#params}
object. Usually, it is a `{key: value}` store where `key` is a table name, and value could be
either a string, a number, or an instance of Date() etc.

On the Frontend - these values go to the corresponding {@link RecordJSON.params} property.

This is an example `params` property in the "simple case":

```javascript
params: {
  name: 'John',
  surname: 'Doe',
  age: 28,
}
```

### The Real World Case

In the real world:
* databases have nested JSONB properties or Mixed Schemas
* developers would like to send more complicated data from the Fronted to the backend as arrays.

To achieve that we "flatten" all the data before saving them to `params` property.

So in the real world params could look like:

```javascript
params: {
  name: 'John',
  surname: 'Doe',
  age: 28,
  // nested objects
  'auth.facebook': 'some login token',
  'auth.twitter': 'twitter login token',
  // arrays
  'interests.0': 'running',
  'interests.1': 'jogging',
}
```
and all the data can be even nested on the deeper levels.

### Why we did that?

An alternative solution would be to store an entire raw object and don't care. But there are 2
reasons why we picked this one.

**1. storing selected data in the database**

If you send to the ORM unflatten save request like this: 

```javascript
Model.save({{ auth: { facebook: 'newFacebookToken' } }})
```

it will override an entire `auth` property, so from the example above, we will lose `auth.twitter`.

In the second (flatten) case:

```javascript
Model.save({ `auth.facebook`: 'newFacebookToken' }})
```

ORM should keep the value of the `auth.twitter`

> The above is true for Mongoose adapter which is the most advanced regarding handing mixed values

**2. Sending data between the Frontend and the Backend in {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData FormData} format**

AdminJS allows you to upload Files from the Frontend to the Backend. The most optimal way of
doing that is by using {@link https://developer.mozilla.org/en-US/docs/Web/API/FormData FormData}.
But, this requires that values for all the fields are send in `[key: string]: string` form.
And this, as you might guess, fits perfectly to our flatten `params` logic.

### Consequences

Flattening in AdminJS has its consequences everywhere where you use

- {@link BaseRecord} and
- {@link RecordJSON}, 

because instead of raw object you have it's flatten version.

Also, (as mentioned) the `payload` send to the backed is also flattened.

There you should use helpers gathered in {@link flat}