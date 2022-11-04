{@link LayoutElement} is used to change the default layout of `edit`, `show` and `new` {@link Action actions}.
You define the layout as an {@link Array<LayoutElement>} and AdminJS renders it with React components.

You don't have to know React, to create a usable Layout for your actions but be sure
to take a look at the possible **Props** which can be used to style the components.
The most often used props are {@link BoxProps}, because {@link Box} is the default wrapper.

### Available values for a {@link LayoutElement} type

To {@link Action#layout } you have to pass an {@link Array<LayoutElement>}. Where each
{@link LayoutElement} could have a different type defining its position and purpose.

### Type definition

Those are available types for {@link LayoutElement}

| Type    | Purpose | Example |
|---------------|--------------------------------------------------------------|------------------|
| string        | It will be changed to the property in vertical layout        | `layout: ['name']` |
| {@link Array<string>} |  It will be changed to the properties in vertical layout     | `layout: [['name', 'surname']]` |
| [string, {@link BoxProps}] | property wrapped by {@link Box} component with {@link BoxProps} | `layout: [['name', {width: 1/2}]]` |
| [{@link BoxProps}, {@link Array<LayoutElement>}] | Creates a Box and nest all the child LayoutElements inside. | `layout: [[{width: 1/2}, ['name', 'surname']]]` |
| {@link Array<LayoutElement>} | For grouping LayoutElements inside a wrapper          | `layout: [['name', {mt: 'xl'}], ['surname', , {ml: 'xl'}]]` |
| [@ComponentName, PropsWithChildren<ComponentProps>] | if you precede first item with "@" it will create component of this name | `layout: [['@Header', {children: 'User Data'}]]` |

### Examples

Let say you have following properties in your database: `companyName`, `email`, `address` and `companySize`

#### 1. The simplest horizontal layout:

```
const layout = [
 'companyName',
 'email',
 'address',
 'companySize',
]
```

generates:

<img src='./images/layout1.png' style="margin-bottom: 20px">

#### 2. Now Wrap everything with a {@link Box} of `2/3` max-width and horizontal margin (mx) set to auto. This will center all inputs

```
const layout = [
  [{ width: 2 / 3, mx: 'auto' }, [
    'companyName',
    'email',
    'address',
    'companySize',
  ]],
]
```

generates:

<img src='./images/layout2.png'>

> Hint: you can also pass an array to `width` to define how it will behave in a different responsive breakpoints.

#### 3. Add headers between sections

```
const layout = [
  [{ width: 2 / 3, mx: 'auto' }, [
    ['@H3', { children: 'Company data' }],
    'companyName',
    'companySize',
    ['@H3', { children: 'Contact Info' }],
    'email',
    'address',
  ]],
]
```

generates:

<img src='./images/layout3.png' style="margin-bottom: 20px" >

> To inject content inside the given Component pass children props to it.

#### 4. Make email and address 50% width

We will wrap them with a {@link Box} (default component) which is a flex.
Then we will have to wrap also each of them with extra box to define paddings.

I will also align to left top section that by removing `{ mx: auto }` and changing width to `1 / 2`.

```
const layout = [{ width: 1 / 2 }, [
    ['@H3', { children: 'Company data' }],
    'companyName',
    'companySize',
  ]],
  [
    ['@H3', { children: 'Contact Info' }],
    [{ flexDirection: 'row', flex: true }, [
      ['email', { pr: 'default', flexGrow: 1 }],
      ['address', { flexGrow: 1 }],
    ]],
  ],
]
```

generates:

<img src='./images/layout4.png' style="margin-bottom: 20px">

#### 5. Lastly, take a look at the example with a function instead of {@link LayoutElement}.

```
const layout = currentAdmin => ([
 ['@MessageBox', {
   message: `Welcome ${currentAdmin && currentAdmin.email}`,
   children: 'On this page yo can do whatever you like',
   variant: 'info',
   mb: 'xxl',
 }],
 [
   'companyName',
   'companySize',
   'email',
   'address',
 ],
])
```

Generates following **Show** page:

<img src='./images/layout5.png'>
