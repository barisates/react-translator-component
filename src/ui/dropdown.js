import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Session from 'react-session-api';

export class Dropdown extends Component {
  constructor(props) {
    super(props);
    const { defaultLanguage } = props;

    this.state = {
      language: defaultLanguage,
      toggle: false,
    };

    const dropdown = data => {
      const { language } = this.state;

      if (data.language && language !== data.language) {
        this.setState({ language: data.language });
      }
    };

    Session.onSet(dropdown);
  }

  componentWillUnmount() {
    Session.unmount('dropdown');
  }

  render() {
    const { languages } = this.props;
    const { language, toggle } = this.state;
    const keys = Object.keys(languages);

    return (
      <div className={`rtc-dropdown ${(toggle ? 'toggle' : '')}`}>
        {keys.length > 0 &&
          (
            <button type="button" className="rtc-dropdown-toggle" onClick={() => this.setState(prevState => ({ toggle: !prevState.toggle }))}>
              <img src={languages[language].icon} alt="Flag" />
              {languages[language].text}
            </button>
          )}
        <div className="rtc-dropdown-menu">
          {keys.map(key => (
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
    );
  }
}

Dropdown.propTypes = {
  languages: PropTypes.object.isRequired,
  defaultLanguage: PropTypes.string.isRequired,
};
