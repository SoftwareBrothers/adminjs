# Migration guide to version v6

## Updating AdminJS to v6

To update AdminJS package to the sixth wersion please use following npm command

```
npm install adminjs
```

This should update the version of ```adminjs``` and ```adminjs-design-system``` packages to newest beta versions. 

If you have ```adminjs-design-system``` in your dependencies you should update it accordingly.

## Changes

### :warning: React upgrade to v18.1.0+

**If you don't have react as a dependency in your project you won't have to do anything 😉**

AdminJS now uses ```react``` and ```react-dom``` in ```v18.1.0+``` as a dependency. Hence if you're using react outside of AdminJS, please upgrade it to the matching version. 
Instructions on how to do it are available [here](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html)

Additionally, we upgraded the ```styled-components``` package to ```v5.3.5```, which works well with react v18. 

### :warning: Rebranding

Branding option `softwareBrothers` is now not supported and replaced with `withMadeWithLove`
which shows a tiny heart icon on the bottom sidebar and login page.

### ⚠️ New RichText input library

Due to security and support issues, richText implementation has changed from Quill to TipTap. Therefore, in AdminJS v6, **all quill-related configurations will no longer be valid.**

### :white_check_mark: Phone and currency inputs

AdminJS gained two new input types. To use phone and currency inputs, use them as a type in your resource option.

**Example of use**

```ts
const TransactionResource: ResourceWithOptions = {
  resource: Transaction,
  options: {
    properties: {
      price: {
        type: 'currency',
      },
      phone: {
        type: 'phone',
      },
    },
    navigation: {
      name: 'App',
      icon: 'Settings',
    }
  }
};
```

### :white_check_mark: Select component available in ```adminjs-design-system```

The select component was extracted from the core package to ```adminjs-design-system```. You no longer need to implement such a component on your own. 
