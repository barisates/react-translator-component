import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Session from 'react-session-api';

let customLanguage = '';

class ChangeLanguageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggle: false,
      language: (Session.get('language') || props.Config.default),
    };
  }

  render() {
    const { Theme, Language, Config, ...props } = this.props;
    const { toggle, language } = this.state;

    Session.onSet(data => {
      if (data.language && language !== data.language) {
        this.setState({
          language: data.language,
        });
      }
    });

    let returnElement = '';
    // Custom List
    if (Language) {
      if (customLanguage !== Language) {
        Session.set('language', Language);
      }
      customLanguage = Language;
      // Default List
    } else if (Theme === 'Dropdown') {
      returnElement = (
        <div {...props}>
          <div className={`rtc-dropdown ${(toggle ? 'toggle' : '')}`}>
            <button type="button" className="rtc-dropdown-toggle" onClick={() => this.setState({ toggle: !toggle })}>
              <img src={Config.list[language].icon} alt="Flag" />
              {Config.list[language].text}
            </button>
            <div className="rtc-dropdown-menu">
              {Object.keys(Config.list).map(key => (
                <button key={key} type="button" className="rtc-btn" data-selected={(key === language)} onClick={() => { Session.set('language', key); this.setState({ toggle: false }); }}>
                  <img src={Config.list[key].icon} alt="Flag" className="rtc-flag" />
                  {Config.list[key].text}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      returnElement = (
        <div {...props}>
          <ul className="rtc-translator">
            {Object.keys(Config.list).map(key => (
              <li key={key} value={key} data-selected={(key === language)}>
                <button type="button" onClick={() => Session.set('language', key)}>
                  <img src={Config.list[key].icon} alt="Flag" className="rtc-flag" />
                  <span className="rtc-title">{Config.list[key].text}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return returnElement;
  }
}

ChangeLanguageList.propTypes = {
  Theme: PropTypes.string,
  Language: PropTypes.string,
  Config: PropTypes.object,
};

ChangeLanguageList.defaultProps = {
  Theme: '',
  Language: '',
  Config: {
    list: [],
  },
};

export default ChangeLanguageList;
