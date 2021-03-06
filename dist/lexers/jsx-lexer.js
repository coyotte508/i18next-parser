'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _htmlLexer = require('./html-lexer');var _htmlLexer2 = _interopRequireDefault(_htmlLexer);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var

JsxLexer = function (_HTMLLexer) {_inherits(JsxLexer, _HTMLLexer);
  function JsxLexer() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};_classCallCheck(this, JsxLexer);
    options.attr = options.attr || 'i18nKey';return _possibleConstructorReturn(this, (JsxLexer.__proto__ || Object.getPrototypeOf(JsxLexer)).call(this,
    options));
  }_createClass(JsxLexer, [{ key: 'extract', value: function extract(

    content) {
      this.extractInterpolate(content);
      this.extractTrans(content);
      return this.keys;
    } }, { key: 'extractInterpolate', value: function extractInterpolate(

    content) {
      var matches = void 0;
      var regex = new RegExp(
      '<Interpolate([^>]*\\s' + this.attr + '[^>]*)\\/?>',
      'gi');


      while (matches = regex.exec(content)) {
        var attrs = this.parseAttributes(matches[1]);
        var key = attrs.keys;
        if (key) {
          this.keys.push(_extends({}, attrs.options, { key: key }));
        }
      }

      return this.keys;
    } }, { key: 'extractTrans', value: function extractTrans(

    content) {
      var matches = void 0;
      var closingTagPattern = '(?:<Trans([^>]*\\s' + this.attr + '[^>]*?)\\/>)';
      var selfClosingTagPattern = '(?:<Trans([^>]*\\s' + this.attr + '[^>]*?)>((?:\\s|.)*?)<\\/Trans>)';
      var regex = new RegExp(
      [closingTagPattern, selfClosingTagPattern].join('|'),
      'gi');


      while (matches = regex.exec(content)) {
        var attrs = this.parseAttributes(matches[1] || matches[2]);
        var key = attrs.keys;

        if (matches[3] && !attrs.options.defaultValue) {
          attrs.options.defaultValue = matches[3].trim();
        }

        if (key) {
          this.keys.push(_extends({}, attrs.options, { key: key }));
        }
      }

      return this.keys;
    } }]);return JsxLexer;}(_htmlLexer2.default);exports.default = JsxLexer;