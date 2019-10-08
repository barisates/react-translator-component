import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Session from 'react-session-api';

export const Dropdown = props => {
  const { defaultLanguage, languages } = props;
  const [toggle, setToggle] = useState(false);
  const [language, setLanguage] = useState(defaultLanguage);

  Session.onSet(data => {
    if (data.language && language !== data.language) {
      setLanguage({
        language: data.language,
      });
    }
  });

  return (
    <div {...props}>
      <div className={`rtc-dropdown ${(toggle ? 'toggle' : '')}`}>
        <button type="button" className="rtc-dropdown-toggle" onClick={() => setToggle({ toggle: !toggle })}>
          <img src={languages[language].icon} alt="Flag" />
          {languages[language].text}
        </button>
        <div className="rtc-dropdown-menu">
          {Object.keys(languages).map(key => (
            <button
              key={key}
              type="button"
              className="rtc-btn"
              data-selected={(key === language)}
              onClick={() => {
                Session.set('language', key);
                this.setState({ toggle: false });
              }}
            >
              <img src={languages[key].icon} alt="Flag" className="rtc-flag" />
              {languages[key].text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  languages: PropTypes.object.isRequired,
  defaultLanguage: PropTypes.string.isRequired,
};

export const List = props => {
  const { defaultLanguage, languages } = props;
  const [language, setLanguage] = useState(defaultLanguage);

  Session.onSet(data => {
    if (data.language && language !== data.language) {
      setLanguage({
        language: data.language,
      });
    }
  });

  return (
    <div {...props}>
      <ul className="rtc-translator">
        {Object.keys(languages).map(key => (
          <li key={key} value={key} data-selected={(key === language)}>
            <button type="button" onClick={() => Session.set('language', key)}>
              <img src={languages[key].icon} alt="Flag" className="rtc-flag" />
              <span className="rtc-title">{languages[key].text}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

List.propTypes = {
  languages: PropTypes.object.isRequired,
  defaultLanguage: PropTypes.string.isRequired,
};
