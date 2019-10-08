import React from 'react';
import ReactDOM from 'react-dom';
import { Translator, T, TF, LanguageList } from '../index';

it('renders without crashing', () => {
  // Translate
  T('Test');
  TF('{0} {1}', 'Format', 'Test');

  const div = document.createElement('div');

  // Provider & Language List
  ReactDOM.render(
    <Translator>
      <LanguageList />
    </Translator>,
    div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
