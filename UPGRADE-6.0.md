# Migration guide to version v6

## Updating AdminJS to v6

To update AdminJS package to the sixth wersion please use following npm command

```
npm install adminjs@beta
```

This should update the version of ```adminjs``` and ```adminjs-design-system``` packages to newest beta versions. 

## Changes

### :warning: React upgrade to v18

AdminJS now uses React v18 as a dependency. Hence if you're using react outside of AdminJS, please upgrade it to the matching version. 
Instructions on how to do it are available [here](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html)

### :warning: Rebranding

Branding option `softwareBrothers` is now deprecated and replaced with `withMadeWithLove`
which shows a tiny heart icon on the bottom sidebar and login page.

```ts
  /**
   * Flag indicates if `SoftwareBrothers` tiny hart icon should be visible on the bottom sidebar.
   * @deprecated since 6.0.0
   */
  softwareBrothers?: boolean;
  /**
   * Flag indicates if "made with love" tiny heart icon should be visible on the bottom sidebar.
   * @new since 6.0.0
   */
  withMadeWithLove?: boolean;
```

**Example of use**

```ts
const admin = new AdminJS({
  branding: {
    withMadeWithLove: true
  }
})

```

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
