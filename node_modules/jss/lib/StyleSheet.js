'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _findRenderer = require('./findRenderer');

var _findRenderer2 = _interopRequireDefault(_findRenderer);

var _RulesContainer = require('./RulesContainer');

var _RulesContainer2 = _interopRequireDefault(_RulesContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * StyleSheet model.
 *
 * Options:
 *
 * - `media` media query - attribute of style element.
 * - `meta` meta information about this style - attribute of style element, for e.g. you could pass
 * component name for easier debugging.
 * - `named` true by default - keys are names, selectors will be generated, if false - keys are
 * global selectors.
 * - `link` link jss `Rule` instances with DOM `CSSRule` instances so that styles, can be modified
 * dynamically, false by default because it has some performance cost.
 * - `element` style element, will create one by default
 *
 * @param {Object} [rules] object with selectors and declarations
 * @param {Object} [options]
 * @api public
 */
var StyleSheet = function () {
  function StyleSheet(rules, options) {
    _classCallCheck(this, StyleSheet);

    var named = options.named == null ? true : options.named;
    var index = typeof options.index === 'number' ? options.index : 0;
    var Renderer = (0, _findRenderer2['default'])(options);

    // Rules registry for access by .getRule() method.
    // It contains the same rule registered by name and by class name.
    this.rules = Object.create(null);
    this.attached = false;
    this.deployed = false;
    this.linked = false;
    this.classes = Object.create(null);
    this.renderer = new Renderer(options);
    this.renderer.createElement();
    this.options = _extends({}, options, {
      sheet: this,
      parent: this,
      classes: this.classes,
      renderer: this.renderer,
      named: named,
      index: index,
      Renderer: Renderer
    });
    this.rules = new _RulesContainer2['default'](this.options);

    for (var name in rules) {
      this.rules.createAndRegister(name, rules[name]);
    }

    options.jss.plugins.run(this.rules.getIndex());
  }

  /**
   * Attach renderable to the render tree.
   *
   * @api public
   * @return {StyleSheet}
   */


  _createClass(StyleSheet, [{
    key: 'attach',
    value: function attach() {
      if (this.attached) return this;
      if (!this.deployed) this.deploy();
      this.renderer.attach();
      if (!this.linked && this.options.link) this.link();
      this.attached = true;
      return this;
    }

    /**
     * Remove renderable from render tree.
     *
     * @return {StyleSheet}
     * @api public
     */

  }, {
    key: 'detach',
    value: function detach() {
      if (!this.attached) return this;
      this.renderer.detach();
      this.attached = false;
      return this;
    }

    /**
     * Add a rule to the current stylesheet. Will insert a rule also after the stylesheet
     * has been rendered first time.
     *
     * Options:
     *   - `index` rule position, will be pushed at the end if undefined.
     *
     * @param {String} [name] can be selector or name if ´options.named is true
     * @param {Object} style property/value hash
     * @param {Object} [options]
     * @return {Rule}
     * @api public
     */

  }, {
    key: 'addRule',
    value: function addRule(name, style, options) {
      var queue = this.queue;

      // Plugins can create rules.
      // In order to preserve the right order, we need to queue all `.addRule` calls,
      // which happen after the first `rules.create()` call.

      if (this.attached && !queue) this.queue = [];

      var rule = this.rules.create(name, style, options);

      if (this.attached) {
        if (!this.deployed) return rule;
        // Don't insert rule directly if there is no stringified version yet.
        // It will be inserted all together when .attach is called.
        if (queue) queue.push(rule);else {
          var renderable = this.renderer.insertRule(rule);
          if (this.options.link) rule.renderable = renderable;
          if (this.queue) {
            this.queue.forEach(this.renderer.insertRule, this.renderer);
            this.queue = null;
          }
        }
        return rule;
      }

      // We can't add rules to a detached style node.
      // We will redeploy the sheet once user will attach it.
      this.deployed = false;

      return rule;
    }

    /**
     * Create rules, will render also after stylesheet was rendered the first time.
     *
     * @param {Object} rules name:style hash.
     * @param {Object} [options]
     * @return {Array} array of added rules
     * @api public
     */

  }, {
    key: 'addRules',
    value: function addRules(rules, options) {
      var added = [];
      for (var name in rules) {
        added.push(this.addRule(name, rules[name], options));
      }
      return added;
    }

    /**
     * Get a rule.
     *
     * @see RulesContainer.get()
     * @api public
     */

  }, {
    key: 'getRule',
    value: function getRule(nameOrSelector) {
      return this.rules.get(nameOrSelector);
    }

    /**
     * Delete a rule.
     *
     * @param {String} rule selector or name
     * @return {Boolean} true if rule has been deleted from the DOM.
     * @api public
     */

  }, {
    key: 'deleteRule',
    value: function deleteRule(nameOrSelector) {
      var rule = this.rules.get(nameOrSelector);

      if (!rule) return false;

      this.rules.remove(rule);

      if (this.attached) {
        return this.renderer.deleteRule(rule.renderable);
      }

      return true;
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
     * Convert rules to a CSS string.
     *
     * @see RulesContainer.toString()
     * @api public
     */

  }, {
    key: 'toString',
    value: function toString(options) {
      return this.rules.toString(options);
    }

    /**
     * Deploy pure CSS string to a renderable.
     *
     * @return {StyleSheet}
     * @api private
     */

  }, {
    key: 'deploy',
    value: function deploy() {
      this.renderer.deploy(this);
      this.deployed = true;
      return this;
    }

    /**
     * Link renderable CSS rules with their corresponding models.
     *
     * @return {StyleSheet}
     * @api private
     */

  }, {
    key: 'link',
    value: function link() {
      var renderables = this.renderer.getRules();
      for (var selector in renderables) {
        var rule = this.rules.get(selector);
        if (rule) rule.renderable = renderables[selector];
      }
      this.linked = true;
      return this;
    }
  }]);

  return StyleSheet;
}();

exports['default'] = StyleSheet;