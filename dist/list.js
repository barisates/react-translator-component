"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSessionApi = _interopRequireDefault(require("react-session-api"));

var _config = _interopRequireDefault(require("./config"));

var _storage = _interopRequireDefault(require("./storage"));

var _index = require("./ui/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SelectList =
/*#__PURE__*/
function (_Component) {
  _inherits(SelectList, _Component);

  function SelectList() {
    _classCallCheck(this, SelectList);

    return _possibleConstructorReturn(this, _getPrototypeOf(SelectList).apply(this, arguments));
  }

  _createClass(SelectList, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var Language = this.props.Language;

      if (Language && prevProps.Language !== Language) {
        _reactSessionApi["default"].set('language', Language);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Theme = _this$props.Theme,
          Language = _this$props.Language,
          props = _objectWithoutProperties(_this$props, ["Theme", "Language"]);

      var defaultLanguage = _storage["default"].language() || _config["default"]["default"];

      var returnElement = _react["default"].createElement(_react["default"].Fragment, null); // Custom List


      if (Language) {// Default List
      } else if (Theme.toLowerCase() === 'dropdown') {
        returnElement = _react["default"].createElement("div", props, _react["default"].createElement(_index.Dropdown, {
          languages: _config["default"].list,
          defaultLanguage: defaultLanguage
        }));
      } else {
        returnElement = _react["default"].createElement("div", props, _react["default"].createElement(_index.List, {
          languages: _config["default"].list,
          defaultLanguage: defaultLanguage
        }));
      }

      return returnElement;
    }
  }]);

  return SelectList;
}(_react.Component);

SelectList.propTypes = {
  Theme: _propTypes["default"].string,
  Language: _propTypes["default"].string
};
SelectList.defaultProps = {
  Theme: '',
  Language: ''
};
var _default = SelectList;
exports["default"] = _default;