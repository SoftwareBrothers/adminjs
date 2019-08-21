# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Started from version 0.9.5

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