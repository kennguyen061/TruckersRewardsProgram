'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findClassNames = exports.toCssValue = undefined;
exports.generateClassName = generateClassName;
exports.toCss = toCss;

var _murmurhash3_gc = require('murmurhash-js/murmurhash3_gc');

var _murmurhash3_gc2 = _interopRequireDefault(_murmurhash3_gc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Generates a class name using murmurhash.
 *
 * @param {String} str
 * @param {Rule} rule
 * @return {String}
 */
function generateClassName(str, rule) {
  var hash = (0, _murmurhash3_gc2['default'])(str);
  return rule.name ? rule.name + '-' + hash : hash;
}

/**
 * Indent a string.
 *
 * http://jsperf.com/array-join-vs-for
 *
 * @param {Number} level
 * @param {String} str
 * @return {String}
 */
function indent(level, str) {
  var indentStr = '';
  for (var index = 0; index < level; index++) {
    indentStr += '  ';
  }return indentStr + str;
}

/**
 * Converts array values to string.
 *
 * `margin: [['5px', '10px']]` > `margin: 5px 10px;`
 * `border: ['1px', '2px']` > `border: 1px, 2px;`
 *
 * @param {Array} value
 * @return {String|Number|Object}
 */
var toCssValue = exports.toCssValue = function () {
  function joinWithSpace(value) {
    return value.join(' ');
  }

  return function joinWithComma(value) {
    if (!Array.isArray(value)) return value;

    // Support space separated values.
    if (Array.isArray(value[0])) {
      return joinWithComma(value.map(joinWithSpace));
    }

    return value.join(', ');
  };
}();

/**
 * Converts a Rule to CSS string.
 *
 * Options:
 * - `selector` use `false` to get a rule without selector
 * - `indentationLevel` level of indentation
 *
 * @param {String} selector
 * @param {Object} style
 * @param {Object} options
 * @return {String}
 */
function toCss(selector, style) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var indentationLevel = options.indentationLevel || 0;
  var str = '';

  var fallbacks = style.fallbacks;


  if (options.selector !== false) indentationLevel++;

  // Apply fallbacks first.
  if (fallbacks) {
    // Array syntax {fallbacks: [{prop: value}]}
    if (Array.isArray(fallbacks)) {
      for (var index = 0; index < fallbacks.length; index++) {
        var fallback = fallbacks[index];
        for (var prop in fallback) {
          var value = fallback[prop];
          if (value != null) {
            str += '\n' + indent(indentationLevel, prop + ': ' + toCssValue(value) + ';');
          }
        }
      }
    }
    // Object syntax {fallbacks: {prop: value}}
    else {
        for (var _prop in fallbacks) {
          var _value = fallbacks[_prop];
          if (_value != null) {
            str += '\n' + indent(indentationLevel, _prop + ': ' + toCssValue(_value) + ';');
          }
        }
      }
  }

  for (var _prop2 in style) {
    var _value2 = style[_prop2];
    if (_value2 != null && _prop2 !== 'fallbacks') {
      str += '\n' + indent(indentationLevel, _prop2 + ': ' + toCssValue(_value2) + ';');
    }
  }

  if (!str) return str;

  if (options.selector !== false) {
    indentationLevel--;
    str = indent(indentationLevel, selector + ' {' + str + '\n') + indent(indentationLevel, '}');
  }

  return str;
}

/**
 * Get class names from a selector.
 *
 * @param {String} selector
 * @return {String}
 */
var findClassNames = exports.findClassNames = function () {
  var dotsRegExp = /[.]/g;
  var classesRegExp = /[.][^ ,]+/g;

  return function (selector) {
    var classes = selector.match(classesRegExp);

    if (!classes) return '';

    return classes.join(' ').replace(dotsRegExp, '');
  };
}();