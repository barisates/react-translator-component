"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Config", {
  enumerable: true,
  get: function get() {
    return _config["default"];
  }
});
exports.LanguageList = exports.TF = exports.T = exports.Translator = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSessionApi = _interopRequireDefault(require("react-session-api"));

var _reactHtmlParser = _interopRequireDefault(require("react-html-parser"));

var _storage = _interopRequireDefault(require("./storage"));

var _config = _interopRequireDefault(require("./config"));

var _list = _interopRequireDefault(require("./list"));

require("./index.css");

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

var File = {};

var Translator =
/*#__PURE__*/
function (_Component) {
  _inherits(Translator, _Component);

  function Translator(props) {
    var _this;

    _classCallCheck(this, Translator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Translator).call(this, props)); // set language

    var defaultLangugae = _storage["default"].language() || _config["default"]["default"]; // load file


    File = _config["default"].list[defaultLangugae] ? _config["default"].list[defaultLangugae].file : '';

    _reactSessionApi["default"].set('language', defaultLangugae); // set state language


    _this.state = {
      language: defaultLangugae
    };
    return _this;
  }

  _createClass(Translator, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var translator = function translator(data) {
        var language = data.language;
        var stateLanguage = _this2.state.language;

        if (language && language !== stateLanguage) {
          // set localStorage
          _storage["default"].setLanguage(language); // load file


          File = _config["default"].list[language].file; // set state language

          _this2.setState({
            language: language
          });
        }
      };

      _reactSessionApi["default"].onSet(translator);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _reactSessionApi["default"].unmount('translator');
    }
  }, {
    key: "render",
    value: function render() {
      this.mounted = true;
      var children = this.props.children;
      return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].Children.map(children, function (child) {
        return _react["default"].cloneElement(child);
      }));
    }
  }]);

  return Translator;
}(_react.Component);

exports.Translator = Translator;
Translator.propTypes = {
  children: _propTypes["default"].node
};
Translator.defaultProps = {
  children: null
};

var SetLanguageFile = function SetLanguageFile(text) {
  var languageFile = JSON.parse(_storage["default"].missing()) || {};
  languageFile["\"".concat(text, "\"")] = text;

  try {
    _storage["default"].setMissing(JSON.stringify(languageFile)); // eslint-disable-next-line no-empty

  } catch (_unused) {}

  return text;
};

var T = function T(text) {
  return (0, _reactHtmlParser["default"])(File[text] || SetLanguageFile(text));
};

exports.T = T;

var TranslateFormat = function TranslateFormat(text) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var traslatedText = T(text)[0];
  var formatText = traslatedText.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[0][number] !== 'undefined' ? args[0][number] : match;
  });
  return formatText;
};

var TF = function TF(text) {
  for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return TranslateFormat(text, args);
};

exports.TF = TF;

var LanguageList = function LanguageList(props) {
  return _react["default"].createElement(_list["default"], props);
};

exports.LanguageList = LanguageList;