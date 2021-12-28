import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Session from 'react-session-api';

export const Dropdown = ({ languages, defaultLanguage }) => {
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [toggle, setToggle] = useState(false);
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    setCurrentLanguage(defaultLanguage);

    const dropdown = data => {
      if (!data.language) return;

      if (!languages[data.language]) {
        setCurrentLanguage(defaultLanguage);
        return;
      }

      if (currentLanguage !== data.language) {
        setCurrentLanguage(data.language);
      }
    };

    Session.onSet(dropdown);
    setKeys(Object.keys(languages));

    return () => {
      Session.unmount('dropdown');
    };
  }, []);

  return (
    <div className={`rtc-dropdown ${(toggle ? 'toggle' : '')}`}>
      {keys.length > 0 &&
              (
                <button type="button" className="rtc-dropdown-toggle" onClick={() => setToggle(!toggle)}>
                  <img src={languages[currentLanguage].icon} alt="Flag" />
                  {languages[currentLanguage].text}
                </button>
              )}
      <div className="rtc-dropdown-menu">
        {keys.map(key => (
          <button
            key={key}
            type="button"
            className="rtc-btn"
            data-selected={(key === currentLanguage)}
            onClick={() => {
              Session.set('language', key);
              setToggle(false);
            }}
          >
            <img src={languages[key].icon} alt="Flag" className="rtc-flag" />
            {languages[key].text}
          </button>
        ))}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  languages: PropTypes.object.isRequired,
  defaultLanguage: PropTypes.string.isRequired,
};
