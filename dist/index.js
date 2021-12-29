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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var File = {};

var Translator = function Translator(_ref) {
  var children = _ref.children;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      setCurrentLanguage = _useState2[1];

  (0, _react.useEffect)(function () {
    var defaultLanguage = Object.keys(_config["default"].list).includes(_storage["default"].language()) ? _storage["default"].language() : _config["default"]["default"];
    File = _config["default"].list[defaultLanguage].file;

    _reactSessionApi["default"].set('language', defaultLanguage);

    _storage["default"].setLanguage(defaultLanguage);

    setCurrentLanguage(defaultLanguage);

    var translator = function translator(data) {
      var previousLanguage = _storage["default"].language();

      if (data.language && data.language !== previousLanguage) {
        // set localStorage
        _storage["default"].setLanguage(data.language); // load file


        File = _config["default"].list[data.language].file;
        setCurrentLanguage(data.language);
      }
    };

    _reactSessionApi["default"].onSet(translator);

    return function () {
      _reactSessionApi["default"].unmount('translator');
    };
  }, []);
  return _react["default"].createElement(_react["default"].Fragment, null, children);
};

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

var LanguageList = function LanguageList(_ref2) {
  var Theme = _ref2.Theme,
      Language = _ref2.Language,
      onChange = _ref2.onChange;
  return _react["default"].createElement(_list["default"], {
    Theme: Theme,
    Language: Language,
    onChange: onChange
  });
};

exports.LanguageList = LanguageList;
LanguageList.propTypes = {
  Theme: _propTypes["default"].string,
  Language: _propTypes["default"].string,
  onChange: _propTypes["default"].func
};
LanguageList.defaultProps = {
  Theme: 'dropdown',
  Language: _config["default"]["default"],
  onChange: function onChange() {}
};