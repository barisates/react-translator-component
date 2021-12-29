/* eslint-disable global-require */
import React, { Component } from 'react';
import { Translator, T, TF, LanguageList, Config } from '../src';
import './css/bootstrap.min.css';
import './css/demo.css';

export default {
  title: 'Demo',
};

Config.default = 'tr';
Config.list = {
  de: {
    text: 'Deutsch',
    icon: require('./locale/flags/de.svg'),
    file: require('./locale/de'),
  },
  en: {
    text: 'English',
    icon: require('./locale/flags/en.svg'),
    file: require('./locale/en'),
  },
  es: {
    text: 'Español',
    icon: require('./locale/flags/es.svg'),
    file: require('./locale/es'),
  },
  fr: {
    text: 'Français',
    icon: require('./locale/flags/fr.svg'),
    file: require('./locale/fr'),
  },
  it: {
    text: 'Italiano',
    icon: require('./locale/flags/it.svg'),
    file: require('./locale/it'),
  },
  ru: {
    text: 'Pусский',
    icon: require('./locale/flags/ru.svg'),
    file: require('./locale/ru'),
  },
  tr: {
    text: 'Türkçe',
    icon: require('./locale/flags/tr.svg'),
    file: require('./locale/tr'),
  },
};


class App extends Component {
  constructor() {
    super();

    this.state = {
      language: Config.default,
    };
  }

  render() {
    const { language } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <h6>{T('Doğrular ve yanlışlar yoktur, sadece yorumlar vardır.')}</h6>
            <h6><small><i>{TF('{0} {1}', 'Friedrich', 'Nietzsche')}</i></small></h6>
          </div>
          <table className="language-lists">
            <thead>
              <tr>
                <td>Default Language List</td>
                <td>Custom Language List</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>Dropdown Theme</p>
                  <LanguageList Theme="Dropdown" />
                  <br />
                  <br />
                  <p>Default Theme</p>
                  <LanguageList />
                </td>
                <td>
                  <LanguageList Language={language} />
                  <select className="custom-language-list" value={language} onChange={e => this.setState({ language: e.target.value })}>
                    {Object.keys(Config.list).map(key => (<option key={key} value={key}>{Config.list[key].text}</option>))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="author">
            <a href="https://github.com/barisates" target="_blank" rel="noopener noreferrer" className="mr-1">barisates</a>
            <a href="https://github.com/eneszeren" target="_blank" rel="noopener noreferrer" className="ml-1">eneszeren</a>
          </div>
        </header>
      </div>
    );
  }
}

export const Demo = () => (

  <Translator>
    <App />
  </Translator>
);
