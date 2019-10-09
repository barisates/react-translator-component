/* eslint-disable global-require */
import React from 'react';
import ReactDOM from 'react-dom';
import { Translator, T, TF, LanguageList, Config } from '../index';

it('renders without crashing: null config, theme dropdown', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Translator>
      <LanguageList Theme="dropdown" />
    </Translator>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing: test config', () => {
  const div = document.createElement('div');

  Config.default = 'tr';
  Config.list = {
    en: {
      text: 'English',
      icon: require('../../stories/locale/flags/en.svg'),
      file: require('../../stories/locale/en'),
    },
    tr: {
      text: 'Türkçe',
      icon: require('../../stories/locale/flags/tr.svg'),
      file: require('../../stories/locale/tr'),
    },
  };

  ReactDOM.render(
    <Translator>
      <LanguageList />
    </Translator>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing: test config, translate sample', () => {
  const div = document.createElement('div');

  Config.default = 'tr';
  Config.list = {
    en: {
      text: 'English',
      icon: require('../../stories/locale/flags/en.svg'),
      file: require('../../stories/locale/en'),
    },
    tr: {
      text: 'Türkçe',
      icon: require('../../stories/locale/flags/tr.svg'),
      file: require('../../stories/locale/tr'),
    },
  };

  ReactDOM.render(
    <Translator>
      <p>{T('So far you\'ve believed that tyrants exist, but you\'re wrong:')}</p>
      <p>{T('there are only slaves.')}</p>
      <p>{T('When no one obeys, no one can give orders.')}</p>
      <br />
      <p>{TF('{0} {1}', 'Anarchy is order,', ' and the government is civil war.')}</p>
      <LanguageList />
    </Translator>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
