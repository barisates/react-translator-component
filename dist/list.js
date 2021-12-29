"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactSessionApi = _interopRequireDefault(require("react-session-api"));

var _config = _interopRequireDefault(require("./config"));

var _index = require("./ui/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SelectList = function SelectList(_ref) {
  var Theme = _ref.Theme,
      onChange = _ref.onChange;

  var _useState = (0, _react.useState)(_config["default"]["default"]),
      _useState2 = _slicedToArray(_useState, 1),
      currentLanguage = _useState2[0];

  var onLanguageChange = function onLanguageChange(data) {
    if (data && data.language) {
      onChange(data.language);
    }
  };

  (0, _react.useEffect)(function () {
    _reactSessionApi["default"].onSet(onLanguageChange);
  }, []);
  var returnElement = {
    dropdown: _react["default"].createElement("div", null, _react["default"].createElement(_index.Dropdown, {
      languages: _config["default"].list,
      defaultLanguage: currentLanguage
    })),
    list: _react["default"].createElement("div", null, _react["default"].createElement(_index.List, {
      languages: _config["default"].list,
      defaultLanguage: currentLanguage
    }))
  };
  return returnElement[Theme];
};

SelectList.propTypes = {
  Theme: _propTypes["default"].string,
  onChange: _propTypes["default"].func
};
SelectList.defaultProps = {
  Theme: '',
  onChange: function onChange() {}
};
var _default = SelectList;
exports["default"] = _default;