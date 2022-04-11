'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _createRule = require('./createRule');

var _createRule2 = _interopRequireDefault(_createRule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Contains rules objects and allows adding/removing etc.
 * Is used by containers liks StyleSheet or ConditionalRule.
 *
 * @api public
 */
var RulesContainer = function () {
  function RulesContainer(options) {
    _classCallCheck(this, RulesContainer);

    // Rules registry for access by .get() method.
    // It contains the same rule registered by name and by class name.
    this.map = Object.create(null);
    // Used to ensure correct rules order.
    this.index = [];
    this.options = options;
    // Default object is needed when rule is created without a sheet.
    this.classes = options.classes || {};
  }

  /**
   * Create and register rule, run plugins.
   *
   * Will not render after style sheet was rendered the first time.
   * Will link the rule in `this.rules`.
   *
   * @see createRule
   * @api public
   */


  _createClass(RulesContainer, [{
    key: 'create',
    value: function create(name, style, options) {
      var rule = this.createAndRegister(name, style, options);
      this.options.jss.plugins.run(rule);
      return rule;
    }

    /**
     * Delete a rule.
     *
     * @param {String} rule selector or name
     * @return {Boolean} true if rule has been deleted from the DOM.
     * @api public
     */

  }, {
    key: 'remove',
    value: function remove(rule) {
      this.unregister(rule);
      this.index.splice(this.indexOf(rule), 1);
    }

    /**
     * Get a rule.
     *
     * @param {String} nameOrSelector can be selector or name if `named` option is true.
     * @return {Rule}
     * @api public
     */

  }, {
    key: 'get',
    value: function get(nameOrSelector) {
      return this.map[nameOrSelector];
    }

    /**
     * Get index of a rule.
     *
     * @param {Rule} rule
     * @return {Number}
     * @api public
     */

  }, {
    key: 'indexOf',
    value: function indexOf(rule) {
      return this.index.indexOf(rule);
    }

    /**
     * Register a rule in `.map` and `.classes` maps.
     *
     * @param {Rule} rule
     * @api public
     */

  }, {
    key: 'register',
    value: function register(rule) {
      if (rule.name) this.map[rule.name] = rule;
      if (rule.className && rule.name) this.classes[rule.name] = rule.className;
      if (rule.selector) this.map[rule.selector] = rule;
      return this;
    }

    /**
     * Unregister a rule.
     *
     * @param {Rule} rule
     * @api public
     */

  }, {
    key: 'unregister',
    value: function unregister(rule) {
      delete this.map[rule.name];
      delete this.map[rule.selector];
      delete this.classes[rule.name];
      return this;
    }

    /**
     * Convert rules to a CSS string.
     *
     * @param {Object} options
     * @return {String}
     * @api public
     */

  }, {
    key: 'toString',
    value: function toString(options) {
      var str = '';

      for (var index = 0; index < this.index.length; index++) {
        var rule = this.index[index];
        var css = rule.toString(options);

        if (!css) continue;

        if (str) str += '\n';
        str += css;
      }

      return str;
    }

    /**
     * Returns a cloned index of rules.
     * We need this because if we modify the index somewhere else during a loop
     * we end up with very hard-to-track-down side effects.
     *
     * @return {Array}
     * @api public
     */

  }, {
    key: 'getIndex',
    value: function getIndex() {
      // We need to clone the array, because while
      return this.index.slice(0);
    }

    /**
     * Create and register a rule.
     *
     * Options:
     *   - `index` rule position, will be pushed at the end if undefined.
     *
     * @see createRule
     * @api private
     */

  }, {
    key: 'createAndRegister',
    value: function createAndRegister(name, style, options) {
      options = _extends({}, options, {
        classes: this.classes,
        parent: this.options.parent,
        sheet: this.options.sheet,
        jss: this.options.jss,
        Renderer: this.options.Renderer
      });

      // Currently the only case where we have no class name is child rules of
      // some conditional rule.
      if (!options.className) options.className = this.classes[name];

      // Scope options overwrite instance options.
      if (options.named == null) options.named = this.options.named;
      var rule = (0, _createRule2['default'])(name, style, options);
      this.register(rule);

      var index = options.index === undefined ? this.index.length : options.index;
      this.index.splice(index, 0, rule);

      return rule;
    }
  }]);

  return RulesContainer;
}();

exports['default'] = RulesContainer;