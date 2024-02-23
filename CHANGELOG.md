# Changelog

## [4.0.0](https://github.com/cheminfo/mrz/compare/v3.5.0...v4.0.0) (2024-02-23)


### ⚠ BREAKING CHANGES

* The result's `details` may now include a non-null `value` even when it's invalid. The `start` and `end` fields will refer to it instead of the entire range when that happens. The `fields` object is unchanged and still contains `null` for invalid fields.

### Features

* include parsed value in details for invalid text fields ([#51](https://github.com/cheminfo/mrz/issues/51)) ([b6e2652](https://github.com/cheminfo/mrz/commit/b6e2652a0532c57b55c46397a265e82854e1885e))


### Documentation

* improve and complete API documentation ([#52](https://github.com/cheminfo/mrz/issues/52)) ([5be3275](https://github.com/cheminfo/mrz/commit/5be3275818afc526d7fa0f1b766edf328c681bb3))

## [3.5.0](https://github.com/cheminfo/mrz/compare/v3.4.1...v3.5.0) (2024-02-16)


### Features

* improve and export types ([#48](https://github.com/cheminfo/mrz/issues/48)) ([66c31bc](https://github.com/cheminfo/mrz/commit/66c31bc8d686554b9cbf937fbe298a3915475b5e))

## [3.4.1](https://github.com/cheminfo/mrz/compare/v3.4.0...v3.4.1) (2023-10-30)


### Bug Fixes

* do not change lines in-place and account for ranges during autocorrect ([4fd0ead](https://github.com/cheminfo/mrz/commit/4fd0ead0e8fad38f64225e8b545dd8bf046e1c59))

## [3.4.0](https://github.com/cheminfo/mrz/compare/v3.3.0...v3.4.0) (2023-05-18)


### Features

* add code for Kosovo ([#40](https://github.com/cheminfo/mrz/issues/40)) ([dd52450](https://github.com/cheminfo/mrz/commit/dd524508cd6c5feda867099bdab8b2291344a709))

## [3.3.0](https://github.com/cheminfo/mrz/compare/v3.2.1...v3.3.0) (2023-01-25)


### Features

* add autocorrect option ([#29](https://github.com/cheminfo/mrz/issues/29)) ([2eb597c](https://github.com/cheminfo/mrz/commit/2eb597c077fbc40d30020ce6c0c35b795ed6f768))

## [3.2.1](https://github.com/cheminfo/mrz/compare/v3.2.0...v3.2.1) (2023-01-04)


### Bug Fixes

* exports & some parsers ([#26](https://github.com/cheminfo/mrz/issues/26)) ([953189f](https://github.com/cheminfo/mrz/commit/953189f2ae9300fbde8c64c295ddd246f9e4d4fe))

## [3.2.0](https://github.com/cheminfo/mrz/compare/v3.1.4...v3.2.0) (2023-01-03)


### Features

* refactor to typescript ([b6c0c54](https://github.com/cheminfo/mrz/commit/b6c0c54a8955908d5d1bc92f1ac4c148eeefdf60))

### [3.1.4](https://www.github.com/cheminfo/mrz/compare/v3.1.3...v3.1.4) (2022-04-21)


### Bug Fixes

* update list of country codes ([#18](https://www.github.com/cheminfo/mrz/issues/18)) ([5cda639](https://www.github.com/cheminfo/mrz/commit/5cda63981cd8e2110f3fdb547ac85f1ba4d6ec7d))

### [3.1.3](https://www.github.com/cheminfo/mrz/compare/v3.1.2...v3.1.3) (2021-05-17)


### Bug Fixes

* include XXC nationality code ([7a6e9f3](https://www.github.com/cheminfo/mrz/commit/7a6e9f340a6638c50f1114cd81771d26a5f87f88)), closes [#15](https://www.github.com/cheminfo/mrz/issues/15)

### [3.1.2](https://www.github.com/cheminfo/mrz/compare/v3.1.1...v3.1.2) (2021-02-26)


### Bug Fixes

* support blank last name ([b64d8e2](https://www.github.com/cheminfo/mrz/commit/b64d8e28d6ea1170722fca5be72a3e618a0e9f86))
