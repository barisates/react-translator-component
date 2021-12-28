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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Dropdown = function Dropdown(_ref) {
  var languages = _ref.languages,
      defaultLanguage = _ref.defaultLanguage;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      currentLanguage = _useState2[0],
      setCurrentLanguage = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      toggle = _useState4[0],
      setToggle = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      keys = _useState6[0],
      setKeys = _useState6[1];

  (0, _react.useEffect)(function () {
    setCurrentLanguage(defaultLanguage);

    var dropdown = function dropdown(data) {
      if (!data.language) return;

      if (!languages[data.language]) {
        setCurrentLanguage(defaultLanguage);
        return;
      }

      if (currentLanguage !== data.language) {
        setCurrentLanguage(data.language);
      }
    };

    _reactSessionApi["default"].onSet(dropdown);

    setKeys(Object.keys(languages));
    return function () {
      _reactSessionApi["default"].unmount('dropdown');
    };
  }, []);
  return _react["default"].createElement("div", {
    className: "rtc-dropdown ".concat(toggle ? 'toggle' : '')
  }, keys.length > 0 && _react["default"].createElement("button", {
    type: "button",
    className: "rtc-dropdown-toggle",
    onClick: function onClick() {
      return setToggle(!toggle);
    }
  }, _react["default"].createElement("img", {
    src: languages[currentLanguage].icon,
    alt: "Flag"
  }), languages[currentLanguage].text), _react["default"].createElement("div", {
    className: "rtc-dropdown-menu"
  }, keys.map(function (key) {
    return _react["default"].createElement("button", {
      key: key,
      type: "button",
      className: "rtc-btn",
      "data-selected": key === currentLanguage,
      onClick: function onClick() {
        _reactSessionApi["default"].set('language', key);

        setToggle(false);
      }
    }, _react["default"].createElement("img", {
      src: languages[key].icon,
      alt: "Flag",
      className: "rtc-flag"
    }), languages[key].text);
  })));
};

exports.Dropdown = Dropdown;
Dropdown.propTypes = {
  languages: _propTypes["default"].object.isRequired,
  defaultLanguage: _propTypes["default"].string.isRequired
};