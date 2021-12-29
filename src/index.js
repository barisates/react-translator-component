import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Session from 'react-session-api';
import ReactHtmlParser from 'react-html-parser';
import Storage from './storage';
import Config from './config';
import SelectList from './list';
import './index.css';

let File = {};

class Translator extends Component {
  constructor(props) {
    super(props);

    // set language
    const defaultLangugae = (Storage.language() || Config.default);

    // load file
    File = (Config.list[defaultLangugae] ? Config.list[defaultLangugae].file : '');

    Session.set('language', defaultLangugae);
    // set state language
    this.state = {
      language: defaultLangugae,
    };
  }

  componentDidMount() {
    const translator = data => {
      const { language } = data;
      const { language: stateLanguage } = this.state;

      if (language && language !== stateLanguage) {
        // set localStorage
        Storage.setLanguage(language);

        // load file
        File = Config.list[language].file;

        // set state language
        this.setState({ language });
      }
    };

    Session.onSet(translator);
  }

  componentWillUnmount() {
    Session.unmount('translator');
  }

  render() {
    this.mounted = true;
    const { children } = this.props;
    return (
      <>
        {React.Children.map(children, (child => React.cloneElement(child)))}
      </>
    );
  }
}

Translator.propTypes = {
  children: PropTypes.node,
};

Translator.defaultProps = {
  children: null,
};

const SetLanguageFile = text => {
  const languageFile = (JSON.parse(Storage.missing()) || {});

  languageFile[`"${text}"`] = text;

  try {
    Storage.setMissing(JSON.stringify(languageFile));
    // eslint-disable-next-line no-empty
  } catch { }

  return text;
};

const T = text => (ReactHtmlParser(File[text] || SetLanguageFile(text)));

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

const LanguageList = props => <SelectList {...props} />;

export { Translator, T, TF, LanguageList, Config };
