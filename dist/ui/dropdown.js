"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dropdown = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSessionApi = _interopRequireDefault(require("react-session-api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Dropdown =
/*#__PURE__*/
function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this, props));
    var defaultLanguage = props.defaultLanguage;
    _this.state = {
      language: defaultLanguage,
      toggle: false
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var dropdown = function dropdown(data) {
        var _this2$state = _this2.state,
            language = _this2$state.language,
            toggle = _this2$state.toggle;
        var onChange = _this2.props.onChange;

        if (data.language && language !== data.language) {
          _this2.setState({
            language: data.language,
            toggle: toggle
          });

          onChange(data.language);
        }
      };

      _reactSessionApi["default"].onSet(dropdown);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _reactSessionApi["default"].unmount('dropdown');
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var languages = this.props.languages;
      var _this$state = this.state,
          language = _this$state.language,
          toggle = _this$state.toggle;
      var keys = Object.keys(languages);
      return _react["default"].createElement("div", {
        className: "rtc-dropdown ".concat(toggle ? 'toggle' : '')
      }, keys.length > 0 && _react["default"].createElement("button", {
        type: "button",
        className: "rtc-dropdown-toggle",
        onClick: function onClick() {
          return _this3.setState(function (prevState) {
            return {
              toggle: !prevState.toggle
            };
          });
        }
      }, _react["default"].createElement("img", {
        src: languages[language].icon,
        alt: "Flag"
      }), languages[language].text), _react["default"].createElement("div", {
        className: "rtc-dropdown-menu"
      }, keys.map(function (key) {
        return _react["default"].createElement("button", {
          key: key,
          type: "button",
          className: "rtc-btn",
          "data-selected": key === language,
          onClick: function onClick() {
            _reactSessionApi["default"].set('language', key);

            _this3.setState({
              toggle: false
            });
          }
        }, _react["default"].createElement("img", {
          src: languages[key].icon,
          alt: "Flag",
          className: "rtc-flag"
        }), languages[key].text);
      })));
    }
  }]);

  return Dropdown;
}(_react.Component);

exports.Dropdown = Dropdown;
Dropdown.propTypes = {
  languages: _propTypes["default"].object.isRequired,
  defaultLanguage: _propTypes["default"].string.isRequired,
  onChange: _propTypes["default"].func
};
Dropdown.defaultProps = {
  onChange: function onChange() {}
};