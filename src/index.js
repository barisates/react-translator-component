import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import Session from 'react-session-api';
import ChangeLanguageList from './list';
import './index.css';

const storageKey = {
  lang: 'rtc-lang',
  missing: 'rtc-missing-keys',
};

let Config = {
  default: '',
  list: [],
};

let file = {};

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


class Translator extends Component {
  constructor(props) {
    super(props);

    // load config
    Config = (props.Config || Config);

    // set language
    const language = (LocalStorage.getItem(storageKey.lang) || Config.default);

    // load file
    file = (Config.list[language] ? Config.list[language].file : '');

    Session.set(language, language);
    // set state language
    this.state = {
      language,
    };
  }

  componentDidMount() {
    Session.onSet(data => {
      const { language } = data;
      const { language: stateLanguage } = this.state;

      if (language && language !== stateLanguage) {
        // set localStorage
        LocalStorage.setItem(storageKey.lang, language);

        // load file
        file = Config.list[language].file;

        // set state language
        this.setState({ language });
      }
    });
  }

  render() {
    const { children } = this.props;
    const { language } = this.state;
    return (
      <>
        {React.cloneElement(children, { language })}
      </>
    );
  }
}

Translator.propTypes = {
  children: PropTypes.node,
  Config: PropTypes.object,
};

Translator.defaultProps = {
  children: null,
  Config: {
    default: '',
    list: [],
  },
};


const SetLanguageFile = text => {
  const languageFile = (JSON.parse(LocalStorage.getItem(storageKey.missing)) || {});

  languageFile[`"${text}"`] = text;

  try {
    LocalStorage.setItem(storageKey.missing, JSON.stringify(languageFile));
    // eslint-disable-next-line no-empty
  } catch { }

  return text;
};

const T = text => (ReactHtmlParser(file[text] || SetLanguageFile(text)));

const TranslateFormat = (text, ...args) => {
  const traslatedText = T(text)[0];

  const formatText = traslatedText.replace(/{(\d+)}/g, (match, number) => (
    typeof args[0][number] !== 'undefined'
      ? args[0][number]
      : match
  ));

  return formatText;
};

const TF = (text, ...args) => (TranslateFormat(text, args));

const LanguageList = props => <ChangeLanguageList {...props} />;

export { Translator, T, TF, LanguageList };
