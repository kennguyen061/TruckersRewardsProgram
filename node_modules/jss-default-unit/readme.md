![JSS logo](https://avatars1.githubusercontent.com/u/9503099?v=3&s=60)

## JSS plugin that adds units to numeric values

Provide plain numeric values in your JSS style definitions, and the plugin will insert the apposite units. Defaults to `px` for sizes, `ms` for durations, and `%` for transform origins, and these can be customized easily (see Usage Example).

Make sure you read [how to use
plugins](https://github.com/cssinjs/jss/blob/master/docs/setup.md#setup-with-plugins)
in general.

[Demo](http://cssinjs.github.io/examples/index.html#plugin-jss-default-unit) -
[JSS](https://github.com/cssinjs/jss)

[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/cssinjs/lobby)

## Usage example

```javascript
import jss from 'jss'
import defaultUnit from 'jss-default-unit'

// Optionally customize default units.
const options = {
  'line-height': 'rem',
  'font-size': 'rem'
}

jss.use(defaultUnit(options))

// Define styles.
const styles = {
  container: {
    'line-height': 3,
    'font-size': 1.7,
    'height': 200,
    'z-index': 1
  }
}

let sheet = jss.createStyleSheet(styles)

console.log(sheet.toString())
```

Generates the following stylesheet:

```css
.container-0-0 {
  line-height: 3rem;
  font-size: 1.7rem;
  height: 200px;
  z-index: 1;
}
```

## Issues

File a bug against [cssinjs/jss prefixed with \[jss-default-unit\]](https://github.com/cssinjs/jss/issues/new?title=[jss-default-unit]%20).

## Run tests

```bash
npm i
npm run test
```

## License

MIT
