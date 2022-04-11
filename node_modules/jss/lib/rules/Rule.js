'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parse = JSON.parse,
    stringify = JSON.stringify;

/**
 * Regular rules.
 *
 * @api public
 */

var Rule = function () {
  function Rule(selector, style, options) {
    _classCallCheck(this, Rule);

    // We expect style to be plain object.
    // To avoid original style object mutations, we clone it and hash it
    // along the way.
    // It is also the fastetst way.
    // http://jsperf.com/lodash-deepclone-vs-jquery-extend-deep/6
    var styleStr = stringify(style);
    this.style = parse(styleStr);
    this.type = 'regular';
    this.options = options;
    this.selectorText = selector || '';
    this.className = options.className || '';
    this.originalStyle = style;
    if (options.named) {
      this.name = selector;
      if (!this.className) {
        this.className = options.jss.generateClassName(styleStr, this);
      }
      this.selectorText = '.' + this.className;
    }
    this.renderer = options.sheet ? options.sheet.renderer : new options.Renderer();
  }

  /**
   * Set selector string.
   * Attenition: use this with caution. Most browser didn't implement selector
   * text setter, so this will result in rerendering of entire style sheet.
   *
   * @param {String} selector
   * @api public
   */


  _createClass(Rule, [{
    key: 'prop',


    /**
     * Get or set a style property.
     *
     * @param {String} name
     * @param {String|Number} [value]
     * @return {Rule|String|Number}
     * @api public
     */
    value: function prop(name, value) {
      // Its a setter.
      if (value != null) {
        this.style[name] = value;
        // Only defined if option linked is true.
        if (this.renderable) this.renderer.style(this.renderable, name, value);
        return this;
      }
      // Its a getter, read the value from the DOM if its not cached.
      if (this.renderable && this.style[name] == null) {
        // Cache the value after we have got it from the DOM once.
        this.style[name] = this.renderer.style(this.renderable, name);
      }
      return this.style[name];
    }

    /**
     * Apply rule to an element inline.
     *
     * @param {Element} renderable
     * @return {Rule}
     * @api public
     */

  }, {
    key: 'applyTo',
    value: function applyTo(renderable) {
      var json = this.toJSON();
      for (var prop in json) {
        this.renderer.style(renderable, prop, json[prop]);
      }return this;
    }

    /**
     * Returns JSON representation of the rule.
     * Fallbacks are not supported.
     *
     * @return {Object}
     * @api public
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      var json = Object.create(null);
      for (var prop in this.style) {
        var value = this.style[prop];
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') json[prop] = value;else if (Array.isArray(value)) json[prop] = (0, _utils.toCssValue)(value);
      }
      return json;
    }

    /**
     * Generates a CSS string.
     *
     * @see toCss
     * @api public
     */

  }, {
    key: 'toString',
    value: function toString(options) {
      return (0, _utils.toCss)(this.selector, this.style, options);
    }
  }, {
    key: 'selector',
    set: function set() {
      var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var sheet = this.options.sheet;

      // After we modify selector, ref by old selector needs to be removed.

      if (sheet) sheet.rules.unregister(this);

      this.selectorText = selector;
      this.className = (0, _utils.findClassNames)(selector);

      if (!this.renderable) {
        // Register the rule with new selector.
        if (sheet) sheet.rules.register(this);
        return;
      }

      var changed = this.renderer.selector(this.renderable, selector);

      if (changed) {
        sheet.rules.register(this);
        return;
      }

      // If selector setter is not implemented, rerender the sheet.
      // We need to delete renderable from the rule, because when sheet.deploy()
      // calls rule.toString, it will get the old selector.
      delete this.renderable;
      sheet.rules.register(this);
      sheet.deploy().link();
    }

    /**
     * Get selector string.
     *
     * @return {String}
     * @api public
     */
    ,
    get: function get() {
      if (this.renderable) {
        return this.renderer.selector(this.renderable);
      }

      return this.selectorText;
    }
  }]);

  return Rule;
}();

exports['default'] = Rule;