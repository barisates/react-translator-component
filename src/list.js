import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Session from 'react-session-api';
import Config from './config';
import Storage from './storage';
import { Dropdown, List } from './ui/index';

const SelectList = ({ Theme, Language }) => {
  const [currentLanguage, setCurrentLanguage] = useState();

  useEffect(() => {
    if (Language && Language !== currentLanguage) {
      Session.set('language', Language);
      setCurrentLanguage(Language);
    } else {
      const defaultLanguage = Storage.language() || Config.default;
      Session.set('language', defaultLanguage);
      setCurrentLanguage(defaultLanguage);
    }
  }, []);

  const returnElement = {
    dropdown: (
      <div>
        <Dropdown languages={Config.list} defaultLanguage={currentLanguage} />
      </div>
    ),
    list: (
      <div>
        <List languages={Config.list} defaultLanguage={currentLanguage} />
      </div>
    ),
  };

  return returnElement[Theme];
};

SelectList.propTypes = {
  Theme: PropTypes.string,
  Language: PropTypes.string,
};

SelectList.defaultProps = {
  Theme: '',
  Language: '',
};

export default SelectList;
