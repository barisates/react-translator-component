# react-translator-component
React language translation module for developing a multilingual project.

[![npm package][npm-image]][npm-url] 
[![Build Status][travis-image]][travis-url] 
[![Dependencies Status][david-image]][david-url]
[![Package Size][bundlephobia-image]][bundlephobia-url]

## Getting started

#### Install with NPM:

```
$ npm install react-translator-component
```

#### Usage

**Live Demo [CodeSandbox](https://codesandbox.io/s/react-translator-component-demo-zt12w "CodeSandbox")**

Quite simple to use;
- Make your translator configuration.
- Include text contents in the  ```T(text)``` function.
- Finally, call your application in `TranslatorProvider > TranslatorContext`.

```jsx
// App.js
import React from 'react';
import { TranslatorProvider, TranslatorContext, T, TF, LanguageList } from 'react-translator-component'

const config = {
  default: 'en',
  list: {
    en: {
      text: 'English',
      icon: require('./locale/flags/en.svg'),
      file: require('./locale/en.js')
    },
    tr: {
      text: 'Türkçe',
      icon: require('./locale/flags/tr.svg'),
      file: require('./locale/tr.js')
    }
  }
}

function App() {
  return (
    <div>
      <h1>
	  	{T("There are no facts, only interpretations.")}
	  </h1>
      <h6>
	 	 {TF("{0} {1}", "Friedrich", "Nietzsche")}
	  </h6>
      <LanguageList />
    </div>
  )
}

function TranslatorApp() {
  return (
    <TranslatorProvider Config={config}>
      <TranslatorContext>
        {() => (
          <App />
        )}
      </TranslatorContext>
    </TranslatorProvider >
  )
}

export default TranslatorApp;
```

#### Config

```jsx
const RTC_Config = {
  // default language key
  default: 'tr',
  // language list
  list: {
    de: {
	  // display text
      text: 'Deutsch',
	  // display icon
      icon: require('./locale/flags/de.svg'),
	  // translate file
      file: require('./locale/de')
    },
    en: {
      text: 'English',
      icon: require('./locale/flags/en.svg'),
      file: require('./locale/en')
    },
    tr: {
      text: 'Türkçe',
      icon: require('./locale/flags/tr.svg'),
      file: require('./locale/tr')
    }
  }
}
```
#### Translate File

```{key}``` The text you have written into the  ```T(text)``` function.
```{translated_text}``` Related translation text.
```jsx
module.exports = {
    '{text}': '{translated_text}'
}
```
##### Sample
```jsx
// ./locale/en.js
module.exports = {
    'There are no facts, only interpretations.': 'There are no facts, only interpretations.'
}
```

```jsx
// ./locale/tr.js
module.exports = {
    'There are no facts, only interpretations.': 'Doğrular ve yanlışlar yoktur, sadece yorumlar vardır.'
}
```

#### Translate Function
You can develop a multilingual application by typing the text as it is **without using any key**.  Type the text content into the  ```T(text)``` or ```TF(text, ...arg)``` function and update the translation files.

```jsx
// simple usage
T("The text you want to translate.");

// usage with arguments like a string.format
TF("The {0} you want to translate with {1}.", "text", "arguments");
```
>Texts that have not been added to the Translate file will be collected at the **rtc-missing-keys** in LocalStorage.

#### Language List

Use the ```<LanguageList />``` component to change the language within your application.

##### Default Theme

Use with the default theme.

 ```<LanguageList />``` 

![Default Theme](http://barisates.com/git/rtc/default_theme.jpg "Default Theme")

##### Dropdown Theme

Use with the dropdown theme.

 ```<LanguageList Theme="Dropdown" />``` 
 
![Default Theme](http://barisates.com/git/rtc/dropdown_theme.jpg "Default Theme")

#####  Custom Language List

- Define ```<LanguageList  Language={this.state.language} />``` in this way to create your own language list. 
- When ```{this.state.language}``` in changes, your application will be render in that language.



------------
#### Author

**Barış Ateş**
 - http://barisates.com
 - [github/barisates](https://github.com/barisates "github/barisates")
 
**Enes Zeren**
- http://eneszeren.com
- [github/eneszeren](https://github.com/eneszeren "github/eneszeren")

[npm-image]:https://img.shields.io/npm/v/react-translator-component.svg
[npm-url]:https://www.npmjs.com/package/react-translator-component
[travis-image]:https://travis-ci.org/barisates/react-translator-component.svg?branch=master
[travis-url]:https://travis-ci.org/barisates/react-translator-component
[david-image]:https://david-dm.org/barisates/react-translator-component.svg
[david-url]:https://david-dm.org/barisates/react-translator-component
[bundlephobia-image]:https://badgen.net/bundlephobia/minzip/react-translator-component
[bundlephobia-url]:https://bundlephobia.com/result?p=react-translator-component