# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Started since version 0.9.5

## Version v2.3.1 - 03.07.2020

### Fixed

* all linter warnings
* error when onChange() prop hangs when passing there `null`
* now new search button accepts the sortBy param

## Version v2.3.0 - 03.05.2020

### Changed

* [#279] move search records to a separate `search` action of type `resource`

### Fixed

* fix of not showing empty badges in list and show (related to #418)

### Added

* e2e tests for sequelize

## Version v2.2.12 - 01.05.2020

### Fixed

* [#401] - translations for nested properties

## Version v2.2.11 - 30.04.2020

### Fixed

* [#364] - fix for node v12

## Version v2.2.10 - 30.04.2020

### Fixed

* [#333] - translating "add new item" button in arrays

## Version v2.2.9 - 30.04.2020

### Fixed

* [#418] - showing property.availableValues in Badges
* [#333] - translate Yes/No

## Version v2.2.8 - 27.04.2020

### Added

* link changelog with github releases

### Changed

* Change CI from travis to github actions
* add Cypress tests to CI

### Fixed

* [#422] - Cannot disable `datetime` and `boolean` fields

## Version 2.2.7

### Fixed

* fixed warning in the terminal for password field
* fixed button hover in password field

## Version 2.2.6 - 20.04.2020

### Fixed

* fix error when empty inputs weren't saved

## Version 2.2.5 - 15.04.2020

### Added

* added `isSortable` to property options

## Version 2.2.2-4 - 03.04.2020

### Fixed

* bring back old background color to the input
* fix drawer bottom line color
* improve DrawerPortal that it creates new DOM element if it doesn't exist

## Version 2.2.1 - 03.04.2020

### Fixed

* fixing upload files problem

## Version 2.2.0 - 03.04.2020

### Added

* Throwing ValidationError and ForbiddenError in action before hook causes action to return real json with error message.
* added `dev` yarn command

### Fixed

* export useSelectedRecord along with UseSelectedRecordResult
* fix Edit reference component to render nested objects.

### Changed

* BREAKING CHANGE: Change interface of ValidationError and ForbiddenError, as they don't take error message as the first argument
* Type of error message is optional.

## Version 2.1.2 - 19.03.2020

### Fixed

* not refreshing in list

## Version 2.1.1 - 19.03.2020

### Added

* added component width to Action (#365)

## Version 2.1.0 - 19.03.2020

### Added

* add the ability to hide action header (hideActionHeader)
* add option to change the default href for a resource in a sidebar
* add avatarUrl to CurrentAdmin
* add currentAdmin hook
* add `progress` to `useRecord` hook
* each DesignSystem component now has a custom css class starting with "admin-bro_" (#361)
* add option to set ResourceOptions['parent'] to null, which hides navigation parent (#169)
* Added Rect.memo to BasePropertyComponents which speeds up an UI.
* add Step and Stepper components
* add customParams to useRecord submit function
* add support for bunding JSON files.

### Fixed

* fixed show/hide filter button
* fix font from Theme not being passed to the frontend.

### Changed

* move out bg color to a separate property in Theme
* useRecords automatically renders notice and redirects to given page
if it was requested by the backend
* drop zone can have external state via files prop
* now after invoking action with no component there is no need to fetch data
again from the backend to refresh the page.
* if assets are taken from `assetsCDN` they url has a timestamp which invalidates the cache
on every deploy
* now DropZone shows upload limit in different units

## Version 2.0.2/2.0.3 - 10.03.2020

### Fixed

* empty loader bug #336
* error when setting AdminBro in root path #272

## Version 2.0.1 - 03.01.2020

### Added

* add AdminBroOptions.assetsCDN

## Version 2.0.0 - 04.01.2020

### Added

* add i18n support
* add "password" field [#112]
* add hooks: useNotice, useResourceEdit, useResourceNew, useResource, useResources
* add option to change resource id [#286]

### Changed

* change the way of showing resources. From dedicated page to the UI based on Drawer
* change the way of entering the resource from a list - now entire row is clickable
* base the UI on a design-system
** drop bulma CDN dependency
** drop font-awesome CDN dependency
** move most of the dependencies to the global.bundle
** ui is responsive

### Fixed

* Fixed wrong show values on boolean fields in the list [#270]
* fixing wrong documentation in action interface [#264]
* fix wrong path when rendering on the server
* fix responsive issues

### Removed

* remove AdminBroOption.assets.globalsFromCDN - they are always fetched from local bundle

## Version 1.6.3 - 23.01.2020

### Added

* add ADMIN_BRO_SKIP_BUNDLE flag

## Version 1.6.1/1.6.2 - 21.01.2020

### Fixed

* empty File object when uploading files

## Version 1.6.0 - 01.01.2020

### Added

* introduction of a bulkActions
* added ErrorMessageBox component
* added custom pages in the sidebar
* add textarea property type
* export withNotice component

### Changed

* change interface of ApiClient methods: change from `payload` to `data` and reuse axios types
* divide props for custom components to BasePropertyProps, EditPropertyProps, ShowPropertyProps and FilterPropertyProps

### Fixed

* Placeholder typo (was Placehoder)
* wrong property order [#223]
* PropertyOptions for nested properties (#244)
* Not showing 0 in list and show views (#247)
* Selected sidebar elements after page reload (#241)

## Version 1.5.1 and 1.5.2 - 2019-12-21

### fixed

* error when decorating nested properties [#220]

## Version 1.5.0 - 2019-12-17

### Added

* add option to hide logo [PR: #226]
* add drop-area component
* change new and update actions to receive FormData
* add header option to ApiClient
* add isDisabled option to PropertyOptions
* add favicon to the branding options
* added source maps when NODE_ENV is not production

### Changed

* export Types of Action Responses
* Improve Action interface that all fields are optional when passing via ResourceOptions
* Adjust default theme colours to comply with WCAG 2.0 contrast guidelines
* upgrade typescript to 3.7.3
* add option to pass any notice message in Action Response
* extend ValidationError to hold "base error" which if for entire record - not only for a particular property

### Fixed

* showing validation errors for nested mongoose fields [#200, #199]

## Version 1.4.2 - 2019-11-21

### Fixed

* fixed issue with editing nested arrays: [#203]

## Version 1.4.1 - 2019-11-11

### Fixed

* fixed overflow select problem in the filter [#189]

### Changed

* by default assets are not fetched from CDN [#193]

### Added

* better API errors support [#190]

## Version 1.4.0 - 2019-11-04

### Added

* `admin` cli with `bundle` command [beta]
* bring back tags showing total number of records in list action
* now bundle urls are written always in posix format - which fixes #136
* Export more types from "admin-bro"

### Fixed

* fix error when submit of entire record has been triggered by array add/remove buttons
* overlay error with select in filter - #189

### Changed

* Id fields are now second in list by default (after title) - #189
* Improve typescript types export (fix errors when importing admin-bro)

## Version [1.3.5] - 2019-10-17

### Fixed

* fix error with hidden resource filter

## Version [1.3.4] - 2019-10-17

### Fixed

* 404 error has been seen when page loads - fixed.

## Version [1.3.3] - 2019-10-17

### Added

* improve TypeScript setup by adding strict flags
* add 404 errors

### Fixed

* fix error with removing records

## Version [1.3.2] - 2019-10-14

### Added

* all colors are added to the css theme - improve theme support

### Changed

* migrate all remaining components to typescript

## Version [1.3.1] - 2019-10-06

### Added

* added new component: Styled Link

### Changed

* added ActionContext to both before nad after action hooks

## Version [1.3.0] - 2019-10-06

### Added

* most of the app has been rewritten to typescript
* tsc check has been added to the build process
* linter has been updated to cover typescript
* documentation update to cover new types
* components can now be written in typescript
* isVisible and isAccessible have `record` passed to them [#139]
* Action.After hook has also original request as a property

### Changed

* `AdminBro.require` renamed to `AdminBro.bundler`
* components are now required via import { [ComponentName] } from 'admin-bro'
* bump up React version to 16.8.0
* `BaseRecord.toJSON` now takes `currentAdmin` as an argument

## Version [1.2.0] - 2019-09-21

### Fixed

* fixed loading components on windows [#140]
* fixed issue with nested arrays [#135]

### Changed

* remove AdminBro from page title [#121]
* change loader in list from a spinner to placeholder
* update documentation with new Components and adapters

### Added

* add option to define if globals should be fetched from CDM or from local bundle [#121]
* add `Placeholder` component
* export all Application components, that users can also use them

## Version [1.1.4] - 2019-08-30

### Fixed

* fixed errors seen when generating documentation (change <> to </React.Fragment>)

### Changed

* new welcome screen

## Version [1.1.3] - 2019-08-28

### Fixed

* PropertyTypes are now exported as they were before

## Version [1.1.2] - 2019-08-27

### Added

* `alert` message when user is logged out

### Removed

* obsolete `getRecord` action from `ApiClient`

## Version [1.1.1] - 2019-08-27

### Fixed

* Added default color to ValueBlock [#133]
* fix ForbiddenError message
* Not present links to not accesible routes

### Changed

* Custom components now are rendered always first (no matter if the field is an array or mixed type)

## Version [1.1.0] - 2019-08-25

### Added

* support for Arrays in mongoose adapter [#90]
* support for Embeded objects in mongoose adapter [#110]

### Changed

* BaseResource.param could return nested object

## Version [1.0.2] - 2019-08-21

### Fixed

* fix error for nested fields in filter [#115]

### Changed

* change deprecation message to better show which function is deprecated

## Version [1.0.1] - 2019-08-21

### Fixed

* fix error for not existing route [#127]

## Version [1.0.0] - 2019-08-20

### Added

* added action hooks [#123]
* access controll with BaseAction.isAccessible [#118]
* added new `list` action to the configuration
* created new `ActionDecorator` object

### Deprecated

* ResourceDecorator.recordsDecorator() in favour of new BaseAction.after hook
* ViewHelpers#listUrl in favour of ViewHelpers#resourceAction url

### Fixed

* create new record button is hidden when user cannot have an access to it [#122]


## Version [0.9.6] - 2019-08-17

### Added

- add an option to pick default sort [#124]

### Fixed

- fixed a name of the version property (was `versions` instead of correct: `version`) in AdminBroSettings