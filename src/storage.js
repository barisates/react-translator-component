const Key = {
  lang: 'rtc-lang',
  missing: 'rtc-missing-keys',
};

const LocalStorage = {
  support: () => {
    try {
      const key = 'jcfOnRWMIvigArtNb1z3hj6yQ2xlZGiD';
      localStorage.setItem(key, key);
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  },
  getItem: key => {
    if (LocalStorage.support()) {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key, value) => {
    if (LocalStorage.support()) {
      localStorage.setItem(key, value);
    }
  },
};

const Storage = {
  // Language
  language: () => LocalStorage.getItem(Key.lang),
  setLanguage: value => LocalStorage.setItem(Key.lang, value),
  // MissingKey
  missing: () => LocalStorage.getItem(Key.missing),
  setMissing: value => LocalStorage.setItem(Key.missing, value),
};

export default Storage;
