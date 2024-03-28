# AdminJS Development

## Explanation of AdminJS libraries
There are three main terms we use to define AdminJS libraries, which are:

* Core - the main library, containing basically all the logic which you can find in `adminjs` repository
* Plugin - plugins are wrappers around popular frameworks which allow you to connect AdminJS to your Node.js server and build AdminJS-specific routes. For example `@adminjs/express`.
* Adapter - adapters are wrappers around supported ORMs and ODMs. They export classes which extend `BaseDatabase`, `BaseResource` and `BaseProperty` components. Their task is to translate AdminJS specific filters/queries to something understandable by your ORM/ODM of choice in order to communicate with the database. For example `@adminjs/typeorm`.

AdminJS also has got it's own design system library (`@adminjs/design-system`) and a set of premade `features` which you can import into your project (e. g. `@adminjs/passwords`).

## Contributing

### Development
If you want to contribute to the project, fork repositories you will be working on and after you're done with your changes, open a pull request.

AdminJS team uses [semantic-release](https://github.com/semantic-release/semantic-release) library to automatically create `releases` when a pull request is merged to `master` branch or `pre-releases` when a pull request is merged to `beta` branch. Additionally, based on your commit messages, the library automatically generates a changelog.

Because of this, there is a strict requirement on how you should name your `branches` and `commits`.

Branch names should be prefixed with `fix/`, `chore/`, `feat/` or `test/`.

Commit messages should start with `fix:`, `chore:`, `feat:`, `test:` with the following rules:
1. When a commit starting with `chore:` or `test:` is merged, it **will not** create a new release.
2. When a commit starting with `fix:` is merged, a release will be created which upgrades the patch version of the library (example: 6.0.0 -> 6.0.1).
3. When a commit starting with `feat:` is merged, a release will be created which upgrades the minor version of the library (example: 6.0.1 -> 6.1.0).
4. When a commit has `BREAKING CHANGE: xxxxx` inside of it's **description**, a release will be created which upgrades the major version of the library (example: 6.1.0 -> 7.0.0).
5. There are also additional rules defined in `.releaserc`:
- commits starting with `feat(locale):` and `feat(small):` will only upgrade the patch version despite being `feat` (feature) commits. This type of commit message should be used when you want to create a new translation (`feat(locale)`) or when you add a small feature that doesn't affect the library much (`feat(small)`).
- commits starting with `chore(deps):` will upgrade the patch version despite being `chore` commits. These are commits automatically created by [dependabot](https://github.com/dependabot) but you should also use this message type when you want to only upgrade a package manually.
6. When a pull request is merged which contains multiple commit messages, the higher version upgrades take precedence, for example a pull request with `feat:` and `fix:` messages will upgrade the `minor version` (because of `feat: ...` message) but both commit messages will appear in the changelog.

When you work on your bug fixes or new features, make sure they only concern the subject of your pull request. Ideally you would be using `git commit --amend` so that there's only one commit in your pull request.
If for some reason you want to make more than one change and you need to have multiple commit messages in a pull request, each commit message should only contain changes it refers to.

When a pull request contains a lot of commits without proper messages, we usually `squash` them when merging which can result in a poor release changelog.

### Issues
When creating an issue please try to describe your problem with as many details as possible. If your issue is a complex one and would require us to reproduce this to respond, a test repository or a code sample which would allow us to reproduce your problem would be ideal.
If possible, try to create issues by using our issues templates.

### Translations

You can contribute translations via the [fink localization editor](https://fink.inlang.com/github.com/SoftwareBrothers/adminjs).

[![inlang status badge](https://badge.inlang.com/?url=github.com/SoftwareBrothers/adminjs)](https://fink.inlang.com/github.com/SoftwareBrothers/adminjs?ref=badge)

## Developing locally

### Basic example
To see your changes in your local environment you will, first of all, need a test application. You can clone our [example app](https://github.com/SoftwareBrothers/adminjs-example-app) or create your own.

Next, open terminal in your `adminjs` fork repository, install dependencies and run commands:
```bash
$ yarn dev
$ yarn bundle:globals # re-run it only after you install new dependencies
```
After this, run:
```bash
$ yarn link
```
to register `adminjs` under yarn's linked packages.

Now open terminal in your test application's project and link your local `adminjs` package:
```bash
$ yarn link "adminjs"
```
You should be able to see your local changes to `adminjs` package in your test application. However, you might have to restart your test application each time you make changes to `adminjs` local package.

### Advanced example

The case described above is the easiest one. Now let's assume you want to make changes to `@adminjs/design-system` package. This will require you to chain `yarn link` commands:

1. Fork and clone `adminjs-design-system` repository
2. Install dependencies of `adminjs-design-system` and run `yarn dev`
3. Register `@adminjs/design-system` under yarn's linked packages: `yarn link`
4. Since `@adminjs/design-system` is a dependency of `adminjs`, open `adminjs` project locally and run:
```bash
$ yarn link "@adminjs/design-system"
```
and rebuild it.
5. Run `yarn link` to register `adminjs` under yarn's linked packages (if you haven't done it before).
6. Link `adminjs` package in your test application:
```bash
$ yarn link "adminjs"
```

If you try to run your test application now, it should build fine, but you might see some errors when you try to open admin panel in your browser concerning multiple React instances.
This error occurs because when you install repository's dependencies locally, it will install all of them, meaning you will have `react` installed in your `adminjs-design-system` and `adminjs` folders but you may have only one React instance at a time. The easiest way to solve this would be to use a linked `react` package:
1. In your test application, run:
```bash
$ yarn add react@^18.1.0 react-dom@^18.1.0 styled-components@^5.3.5
```
We're also installing `react-dom` and `styled-components` because these two libraries also cause similar issues to `react`.
2. Navigate to installed `react`, `react-dom` and `styled-components` and register them under yarn linked packages:
```bash
$ cd node_modules/react && yarn link
$ cd ../../node_modules/react-dom && yarn link
$ cd ../../node_modules/react-i18next && yarn link
$ cd ../../node_modules/styled-components && yarn link
```
3. Now link those packages in your local `adminjs` and `adminjs-design-system` projects:
```bash
$ yarn link "react"
$ yarn link "react-dom"
$ yarn link "react-i18next"
$ yarn link "styled-components"
```
4. Your test application should now be working.

Having lots of registered packages can bring confusion, you can use the command below to find out which packages you have linked and where they are used:
```bash
$ ls -la ~/.config/yarn/link/
```

`yarn link` documentation: https://classic.yarnpkg.com/en/docs/cli/link

### Alternative to yarn link
The alternative to `yarn link` is to clone our [adminjs-dev](https://github.com/SoftwareBrothers/adminjs-dev) repository. This repository has all AdminJS packages added as submodules in one [yarn workspace](https://classic.yarnpkg.com/lang/en/docs/workspaces/). The repository's README should be detailed enough to get you started.

Please note that using `yarn workspaces` also has it's issues that we haven't yet resolved. One of them is that all submodules dependencies are installed in the top level (in the root directory of `adminjs-dev`) and installing or updating any new dependency in for example `packages/adminjs` won't update it's `yarn.lock` file and you have to do it manually.
The upside is that you don't have to deal with `yarn link` dependency issues plus you're able to see your local changes in other submodules in the same workspace immediately.
