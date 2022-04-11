'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RulesContainer = require('../RulesContainer');

var _RulesContainer2 = _interopRequireDefault(_RulesContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Conditional rule for @media, @supports
 *
 * @api public
 */
var ConditionalRule = function () {
  function ConditionalRule(selector, rules, options) {
    _classCallCheck(this, ConditionalRule);

    this.type = 'conditional';
    this.selector = selector;
    this.options = options;
    this.rules = new _RulesContainer2['default'](_extends({}, options, { parent: this }));
    for (var name in rules) {
      this.createAndRegisterRule(name, rules[name]);
    }

    options.jss.plugins.run(this.rules.getIndex());
  }

  /**
   * Get a rule.
   *
   * @see RulesContainer.get()
   * @api public
   */


  _createClass(ConditionalRule, [{
    key: 'getRule',
    value: function getRule(nameOrSelector) {
      return this.rules.get(nameOrSelector);
    }

    /**
     * Get index of a rule.
     *
     * @see RulesContainer.indexOf()
     * @api public
     */

  }, {
    key: 'indexOf',
    value: function indexOf(rule) {
      return this.rules.indexOf(rule);
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

  }, {
    key: 'addRule',
    value: function addRule(name, style, options) {
      return this.rules.create(name, style, this.getChildOptions(options));
    }

    /**
     * Generates a CSS string.
     *
     * @return {String}
     * @api public
     */

  }, {
    key: 'toString',
    value: function toString() {
      var inner = this.rules.toString({ indentationLevel: 1 });
      if (!inner) return '';
      return this.selector + ' {\n' + inner + '\n}';
    }

    /**
     * Build options object for a child rule.
     *
     * @param {Object} options
     * @api private
     * @return {Object}
     */

  }, {
    key: 'getChildOptions',
    value: function getChildOptions(options) {
      return _extends({}, this.options, { parent: this }, options);
    }

    /**
     * Create and register a rule.
     *
     * @see RulesContainer.createAndRegister()
     * @api private
     */

  }, {
    key: 'createAndRegisterRule',
    value: function createAndRegisterRule(name, style) {
      return this.rules.createAndRegister(name, style, this.getChildOptions());
    }
  }]);

  return ConditionalRule;
}();

exports['default'] = ConditionalRule;