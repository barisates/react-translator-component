import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Session from 'react-session-api';

export const List = ({ languages, defaultLanguage }) => {
  const [currentLanguage, setCurrentLanguage] = useState('');

  useEffect(() => {
    setCurrentLanguage(defaultLanguage);

    const dropdown = data => {
      if (data.language && currentLanguage !== data.language) {
        setCurrentLanguage(data.language);
      }
    };

    Session.onSet(dropdown);

    return () => {
      Session.unmount('list');
    };
  }, []);

  return (
    <ul className="rtc-translator">
      {Object.keys(languages).map(key => (
        <li key={key} value={key} data-selected={(key === currentLanguage)}>
          <button type="button" onClick={() => Session.set('language', key)}>
            <img src={languages[key].icon} alt="Flag" className="rtc-flag" />
            <span className="rtc-title">{languages[key].text}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  languages: PropTypes.object.isRequired,
  defaultLanguage: PropTypes.string.isRequired,
};
