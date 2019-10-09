"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var Key = {
  lang: 'rtc-lang',
  missing: 'rtc-missing-keys'
};
var LocalStorage = {
  support: function support() {
    try {
      var key = 'jcfOnRWMIvigArtNb1z3hj6yQ2xlZGiD';
      localStorage.setItem(key, key);
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  },
  getItem: function getItem(key) {
    if (LocalStorage.support()) {
      return localStorage.getItem(key);
    }

    return null;
  },
  setItem: function setItem(key, value) {
    if (LocalStorage.support()) {
      localStorage.setItem(key, value);
    }
  }
};
var Storage = {
  // Language
  language: function language() {
    return LocalStorage.getItem(Key.lang);
  },
  setLanguage: function setLanguage(value) {
    return LocalStorage.setItem(Key.lang, value);
  },
  // MissingKey
  missing: function missing() {
    return LocalStorage.getItem(Key.missing);
  },
  setMissing: function setMissing(value) {
    return LocalStorage.setItem(Key.missing, value);
  }
};
var _default = Storage;
exports["default"] = _default;