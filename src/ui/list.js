import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Session from 'react-session-api';


export class List extends Component {
  constructor(props) {
    super(props);
    const { defaultLanguage } = props;

    this.state = {
      language: defaultLanguage,
    };

    const list = data => {
      const { language } = this.state;

      if (data.language && language !== data.language) {
        this.setState({ language: data.language });
      }
    };

    Session.onSet(list);
  }

  componentWillUnmount() {
    Session.unmount('list');
  }

  render() {
    const { languages } = this.props;
    const { language } = this.state;

    return (
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
    );
  }
}

List.propTypes = {
  languages: PropTypes.object.isRequired,
  defaultLanguage: PropTypes.string.isRequired,
};
