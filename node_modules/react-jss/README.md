[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/cssinjs/lobby)

## React integration of JSS

There is a number of benefits when using react-jss instead of [JSS](https://github.com/cssinjs/jss) directly:

- Lazy evaluation - sheet is created only when component will mount.
- Auto attach/detach - sheet will be rendered to the dom when component is about to mount and will be removed when no element needs it.
- A sheet gets shared between all elements.
- You want to use it with [React Hot Loader](https://github.com/gaearon/react-hot-loader).

Also you may need this module if you build a big application where leaving all styles in the DOM or compiling all styles at once may have a performance overhead or you are going to hit [IE limits](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx).

### Usage

You can use it as a [higher-order component](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750) to inject [JSS](https://github.com/cssinjs/jss). It can act both as a simple wrapping function and as a [ES7 decorator](https://github.com/wycats/javascript-decorators).

React JSS wraps your React component and injects `props.sheet`, which is just a regular [JSS style sheet](https://github.com/cssinjs/jss), as a prop into your component. This is a common pattern that is used for composition in React instead of mixins, and works equally well with old-style `createClass` classes, as well as the ES6 classes.

Because JSS class names are namespaced by default, you will need to reach into `this.props.sheet.classes` to get their real names. For example, if you define a `button` class in your JSS stylesheet, its real name will be available as `props.sheet.classes.button`.

By default react-jss comes with [jss](https://github.com/cssinjs/jss) and [presets](https://github.com/cssinjs/jss-preset-default).


```javascript
import React from 'react'
import injectSheet from 'react-jss'

const styles = {
  button: {
    backgroundColor: 'yellow'
  },
  label: {
    fontWeight: 'bold'
  }
}

const Button = ({sheet: {classes}, children}) => (
  <button className={classes.button}>
    <span className={classes.label}>
      {children}
    </span>
  </button>
)

export default injectSheet(styles)(Button)
```

### Custom setup.

If you want to specify a jss version and plugins to use, you should create your [own jss instance](https://github.com/cssinjs/jss/blob/master/docs/js-api.md#create-an-own-jss-instance), [setup plugins](https://github.com/cssinjs/jss/blob/master/docs/setup.md#setup-with-plugins) and create a `injectSheet` function which has your jss version bound.

```javascript
import {create as createJss} from 'jss'
import {create as createInjectSheet} from 'react-jss'
import vendorPrefixer from 'jss-vendor-prefixer'

const jss = createJss()
jss.use(vendorPrefixer())

export const injectSheet = createInjectSheet(jss)
```

You can also access the Jss instance being used by default.

```javascript
import {jss} from 'react-jss'
```

#### Using decorators.

You can use ES7 with [decorators](https://github.com/wycats/javascript-decorators) (using [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)).

```javascript
import React, {Component} from 'react'
import injectSheet from 'react-jss'

const styles = {
  button: {
    backgroundColor: 'yellow'
  },
  label: {
    fontWeight: 'bold'
  }
}

@injectSheet(styles)
export default class Button extends Component {
  render() {
    const {sheet: {classes}, children} = this.props
    return (
      <button className={classes.button}>
        <span className={classes.label}>
          {children}
        </span>
      </button>
    )
  }
}
```

### Using classNames helper.

You can use [classNames](https://github.com/JedWatson/classnames) together with JSS same way you do it with global CSS.

```javascript
import classNames from 'classnames'

const Component = ({sheet: {classes}, children, isActive}) => (
  <div
    className={classNames({
      [classes.normal]: true,
      [classes.active]: isActive
    })}>
    {children}
  </div>
)
```

### Installation.

```
npm install --save react-jss
```

### License

MIT
