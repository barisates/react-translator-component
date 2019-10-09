import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Session from 'react-session-api';
import Config from './config';
import Storage from './storage';
import { Dropdown, List } from './ui/index';

class SelectList extends Component {
  componentDidUpdate(prevProps) {
    const { Language } = this.props;

    if (Language && prevProps.Language !== Language) {
      Session.set('language', Language);
    }
  }

  render() {
    const { Theme, Language, ...props } = this.props;
    const defaultLanguage = (Storage.language() || Config.default);

    let returnElement = <></>;
    // Custom List
    if (Language) {

      // Default List
    } else if (Theme.toLowerCase() === 'dropdown') {
      returnElement = (
        <div {...props}>
          <Dropdown languages={Config.list} defaultLanguage={defaultLanguage} />
        </div>
      );
    } else {
      returnElement = (
        <div {...props}>
          <List languages={Config.list} defaultLanguage={defaultLanguage} />
        </div>
      );
    }
    return returnElement;
  }
}

SelectList.propTypes = {
  Theme: PropTypes.string,
  Language: PropTypes.string,
};

SelectList.defaultProps = {
  Theme: '',
  Language: '',
};

export default SelectList;
