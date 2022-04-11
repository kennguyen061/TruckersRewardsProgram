## 4.2.0 / 2016-11-21

- Upgrade to jss-present-default 0.9.0

## 4.1.3 / 2016-11-03

- Fixing tests (React regression https://github.com/facebook/react/issues/7803)

## 4.1.2 / 2016-10-07

-  Fix refs inconsistency on hot reloading #18

## 4.1.1 / 2016-09-27

- Update dependencies
- Tests integration for jss repo

## 4.1.0 / 2016-09-27

- Make default Jss instance available.

## 4.0.3 / 2016-09-25

- Default Container component should render children to allow wrapping.

## 4.0.2 / 2016-09-25

- Maked passing a component optional.

## 4.0.1 / 2016-09-25

- Fix test runner for jss main repo.

## 4.0.0 / 2016-09-24

- Added jss and jss-preset-default as a dependency, uses jss-preset-default by default #49.
- Added tests #28.
- Streamlined the api, default export is now a function without overloads, it is `injectSheet(styles, [options])(Component)`, same signature is used by ES7 decorators #37.
- Added component name as data-meta attribute to the sheet #22.
- Added a `create()` function to create a new `injectSheet` function which takes a `jss` instance.
- Updated readme.
- Added lint-staged.

