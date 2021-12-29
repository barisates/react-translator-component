import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Session from 'react-session-api';
import ReactHtmlParser from 'react-html-parser';
import Storage from './storage';
import Config from './config';
import SelectList from './list';
import './index.css';

let File = {};

const Translator = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState();

  useEffect(() => {
    const defaultLangugae = (Storage.language() || Config.default);

    File = (Config.list[defaultLangugae] ? Config.list[defaultLangugae].file : '');

    Session.set('language', defaultLangugae);

    setCurrentLanguage(defaultLangugae);

    const translator = data => {
      if (data.language && data.language !== currentLanguage) {
        // set localStorage
        Storage.setLanguage(data.language);

        // load file
        File = Config.list[data.language].file;

        setCurrentLanguage(data.language);
      }
    };

    Session.onSet(translator);

    return () => {
      Session.unmount('translator');
    };
  }, []);

  return (
    <>
      {React.Children.map(children, (child => React.cloneElement(child)))}
    </>
  );
};

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
