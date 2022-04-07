'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Get or set a style property.
 *
 * @param {CSSStyleRule} element
 * @param {String} name
 * @param {String} [value]
 * @return {String|Boolean}
 * @api private
 */
function style(CSSStyleRule, name, value) {
  try {
    // It is a getter.
    if (value == null) return CSSStyleRule.style[name];
    CSSStyleRule.style[name] = value;
  } catch (err) {
    // IE may throw if property is unknown.
    return false;
  }
  return true;
}

/**
 * Get or set the selector.
 *
 * @param {CSSStyleRule} CSSStyleRule
 * @param {String} [selectorText]
 * @return {String|Boolean}
 * @api private
 */
function selector(CSSStyleRule, selectorText) {
  // It is a getter.
  if (selectorText == null) return CSSStyleRule.selectorText;

  CSSStyleRule.selectorText = selectorText;

  // Return false if setter was not successful.
  // Currently works in chrome only.
  return CSSStyleRule.selectorText === selectorText;
}

/**
 * DOM rendering backend for StyleSheet.
 *
 * @api private
 */

var DomRenderer = function () {
  function DomRenderer(options) {
    _classCallCheck(this, DomRenderer);

    this.options = options;
    this.style = style;
    this.selector = selector;
  }

  /**
   * Create and ref style element.
   *
   * @api private
   */


  _createClass(DomRenderer, [{
    key: 'createElement',
    value: function createElement() {
      var _options = this.options,
          media = _options.media,
          meta = _options.meta,
          element = _options.element;

      this.head = document.head || document.getElementsByTagName('head')[0];
      this.element = element || document.createElement('style');
      this.element.type = 'text/css';
      this.element.setAttribute('data-jss', '');
      if (media) this.element.setAttribute('media', media);
      if (meta) this.element.setAttribute('data-meta', meta);
    }

    /**
     * Insert style element into render tree.
     *
     * @api private
     */

  }, {
    key: 'attach',
    value: function attach() {
      // In the case the element node is external and it is already in the DOM.
      if (this.element.parentNode) return;

      var anchorEl = null;

      var _options2 = this.options,
          index = _options2.index,
          jss = _options2.jss;
      var registry = jss.sheets.registry;


      if (registry.length > 1) {
        // Try to insert by index if set
        if (typeof index === 'number') {
          for (var i = 0; i < registry.length; i++) {
            var sheet = registry[i];
            if (!sheet.attached || typeof sheet.options.index !== 'number' || sheet.options.index <= index) continue;
            anchorEl = sheet.renderer.element;
            break;
          }
        }

        // Otherwise insert after the last attached
        if (!anchorEl) {
          for (var _i = registry.length - 1; _i >= 0; _i--) {
            var _sheet = registry[_i];
            if (_sheet.attached) {
              anchorEl = _sheet.renderer.element.nextElementSibling;
              break;
            }
          }
        }
      }

      if (!anchorEl) {
        // Try find a comment placeholder if registry is empty
        for (var _i2 = 0; _i2 < this.head.childNodes.length; _i2++) {
          var el = this.head.childNodes[_i2];
          if (el.nodeValue === 'jss') {
            anchorEl = el;
            break;
          }
        }
      }

      this.head.insertBefore(this.element, anchorEl);
    }

    /**
     * Remove style element from render tree.
     *
     * @api private
     */

  }, {
    key: 'detach',
    value: function detach() {
      this.element.parentNode.removeChild(this.element);
    }

    /**
     * Inject CSS string into element.
     *
     * @param {String} cssStr
     * @api private
     */

  }, {
    key: 'deploy',
    value: function deploy(sheet) {
      this.element.textContent = '\n' + sheet.toString() + '\n';
    }

    /**
     * Insert a rule into element.
     *
     * @param {Rule} rule
     * @return {CSSStyleRule}
     * @api private
     */

  }, {
    key: 'insertRule',
    value: function insertRule(rule) {
      var sheet = this.element.sheet;
      var cssRules = sheet.cssRules;

      var index = cssRules.length;
      try {
        sheet.insertRule(rule.toString(), index);
      } catch (err) {
        (0, _warning2['default'])(false, '[JSS] Can not insert an unsupported rule \n\r%s', rule.toString());
      }
      return cssRules[index];
    }

    /**
     * Delete a rule.
     *
     * @param {CSSStyleRule} rule
     * @return {Boolean} true if the rule was deleted
     * @api private
     */

  }, {
    key: 'deleteRule',
    value: function deleteRule(CSSStyleRule) {
      var sheet = this.element.sheet;
      var cssRules = sheet.cssRules;

      for (var index = 0; index < cssRules.length; index++) {
        if (CSSStyleRule === cssRules[index]) {
          sheet.deleteRule(index);
          return true;
        }
      }
      return false;
    }

    /**
     * Get all rules elements.
     *
     * @return {Object} rules map, where key is selector, CSSStyleRule is value.
     * @api private
     */

  }, {
    key: 'getRules',
    value: function getRules() {
      var cssRules = this.element.sheet.cssRules;

      var rules = Object.create(null);
      for (var index = 0; index < cssRules.length; index++) {
        var CSSStyleRule = cssRules[index];
        rules[CSSStyleRule.selectorText] = CSSStyleRule;
      }
      return rules;
    }
  }]);

  return DomRenderer;
}();

exports['default'] = DomRenderer;