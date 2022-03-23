## Migration guard to version v6

# Rebranding

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
