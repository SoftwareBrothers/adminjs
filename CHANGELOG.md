# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Started from version 0.9.5

## [1.2.0] - 2019-09-21

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

## [1.1.4] - 2019-08-30

### Fixed

* fixed errors seen when generating documentation (change <> to </React.Fragment>)

### Changed

* new welcome screen

## [1.1.3] - 2019-08-28

### Fixed

* PropertyTypes are now exported as they were before

## [1.1.2] - 2019-08-27

### Added

* `alert` message when user is logged out

### Removed

* obsolete `getRecord` action from `ApiClient`

## [1.1.1] - 2019-08-27

### Fixed

* Added default color to ValueBlock [#133]
* fix ForbiddenError message
* Not present links to not accesible routes

### Changed

* Custom components now are rendered always first (no matter if the field is an array or mixed type)

## [1.1.0] - 2019-08-25

### Added

* support for Arrays in mongoose adapter [#90]
* support for Embeded objects in mongoose adapter [#110]

### Changed

* BaseResource.param could return nested object

## [1.0.2] - 2019-08-21

### Fixed

* fix error for nested fields in filter [#115]

### Changed

* change deprecation message to better show which function is deprecated

## [1.0.1] - 2019-08-21

### Fixed

* fix error for not existing route [#127]

## [1.0.0] - 2019-08-20

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


## [0.9.6] - 2019-08-17

### Added

- add an option to pick default sort [#124]

### Fixed

- fixed a name of the version property (was `versions` instead of correct: `version`) in AdminBroSettings