import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Session from 'react-session-api';
import Config from './config';
import { Dropdown, List } from './ui/index';

const SelectList = ({ Theme, Language, onChange }) => {
  const [currentLanguage] = useState(Config.default);

  const onLanguageChange = data => {
    if (data && data.language) {
      onChange(data.language);
    }
  };

  useEffect(() => {
    Session.onSet(onLanguageChange);
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
  onChange: PropTypes.func,
};

SelectList.defaultProps = {
  Theme: '',
  Language: '',
  onChange: () => {},
};

export default SelectList;
