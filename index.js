"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LanguageList = exports.TF = exports.T = exports.TranslatorProvider = exports.TranslatorContext = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactHtmlParser = _interopRequireDefault(require("react-html-parser"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Context = _react["default"].createContext();

var storageKey = {
  lang: 'rtc-lang',
  missing: 'rtc-missing-keys'
};
var Config = {};
var file = {};
var TranslatorContext = Context.Consumer;
exports.TranslatorContext = TranslatorContext;

var TranslatorProvider =
/*#__PURE__*/
function (_Component) {
  _inherits(TranslatorProvider, _Component);

  function TranslatorProvider(props) {
    var _this;

    _classCallCheck(this, TranslatorProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TranslatorProvider).call(this, props)); // load config

    Config = props.Config; // set language

    var language = localStorage.getItem(storageKey.lang) || Config["default"]; // load file

    file = Config.list[language].file; // set state language

    _this.state = {
      language: language
    };
    _this.onChangeLanguage = _this.onChangeLanguage.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TranslatorProvider, [{
    key: "onChangeLanguage",
    value: function onChangeLanguage(language) {
      if (language !== this.state.language) {
        // set localStorage
        localStorage.setItem(storageKey.lang, language); // load file

        file = Config.list[language].file; // set state language

        this.setState({
          language: language
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement(Context.Provider, {
        value: {
          language: this.state.language,
          onChangeLanguage: this.onChangeLanguage
        }
      }, this.props.children);
    }
  }]);

  return TranslatorProvider;
}(_react.Component);

exports.TranslatorProvider = TranslatorProvider;

var T = function T(text) {
  return (0, _reactHtmlParser["default"])(file[text] || SetLanguageFile(text));
};

exports.T = T;

var TF = function TF(text) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return TranslateFormat(text, args);
};

exports.TF = TF;

var TranslateFormat = function TranslateFormat(text) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  args = args[0];
  var traslatedText = T(text)[0];
  var formatText = traslatedText.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != 'undefined' ? args[number] : match;
  });
  return formatText;
};

var SetLanguageFile = function SetLanguageFile(text) {
  var languageFile = JSON.parse(localStorage.getItem(storageKey.missing)) || {};
  languageFile[text] = text;

  try {
    localStorage.setItem(storageKey.missing, JSON.stringify(languageFile));
  } catch (error) {}

  return text;
};

var customLanguage = "";

var LanguageList =
/*#__PURE__*/
function (_Component2) {
  _inherits(LanguageList, _Component2);

  function LanguageList(props) {
    var _this2;

    _classCallCheck(this, LanguageList);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(LanguageList).call(this, props));
    _this2.state = {
      toggle: false
    };
    return _this2;
  }

  _createClass(LanguageList, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react["default"].createElement(TranslatorContext, null, function (_ref) {
        var language = _ref.language,
            onChangeLanguage = _ref.onChangeLanguage;

        // Custom List
        if (_this3.props.Language) {
          if (customLanguage != _this3.props.Language) onChangeLanguage(_this3.props.Language);
          customLanguage = _this3.props.Language;
          return "";
        } // Default List
        else {
            if (!_this3.props.Theme) {
              return _react["default"].createElement("div", _this3.props, _react["default"].createElement("ul", {
                className: "rtc-translator"
              }, Object.keys(Config.list).map(function (key) {
                return _react["default"].createElement("li", {
                  key: key,
                  value: key,
                  "data-selected": key === language,
                  onClick: function onClick(e) {
                    return onChangeLanguage(key);
                  }
                }, _react["default"].createElement("img", {
                  src: Config.list[key].icon,
                  alt: "Flag",
                  className: "rtc-flag"
                }), " ", _react["default"].createElement("span", {
                  className: "rtc-title"
                }, Config.list[key].text));
              })));
            } else if (_this3.props.Theme === "Dropdown") {
              return _react["default"].createElement("div", _this3.props, _react["default"].createElement("div", {
                className: "rtc-dropdown " + (_this3.state.toggle ? "toggle" : "")
              }, _react["default"].createElement("button", {
                type: "button",
                className: "rtc-dropdown-toggle",
                onClick: function onClick(e) {
                  return _this3.setState({
                    toggle: !_this3.state.toggle
                  });
                }
              }, _react["default"].createElement("img", {
                src: Config.list[language].icon,
                alt: "Flag"
              }), " ", Config.list[language].text), _react["default"].createElement("div", {
                className: "rtc-dropdown-menu"
              }, Object.keys(Config.list).map(function (key) {
                return _react["default"].createElement("button", {
                  type: "button",
                  className: "rtc-btn",
                  "data-selected": key === language,
                  onClick: function onClick(e) {
                    onChangeLanguage(key);

                    _this3.setState({
                      toggle: false
                    });
                  }
                }, _react["default"].createElement("img", {
                  src: Config.list[key].icon,
                  alt: "Flag",
                  "class": "rtc-flag"
                }), " ", Config.list[key].text);
              }))));
            }
          }
      });
    }
  }]);

  return LanguageList;
}(_react.Component);

exports.LanguageList = LanguageList;
