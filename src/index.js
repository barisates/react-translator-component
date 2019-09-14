import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import './index.css';

const Context = React.createContext();

const storageKey = {
    lang: 'rtc-lang',
    missing: 'rtc-missing-keys'
};

let Config = {};

let file = {};

export const TranslatorContext = Context.Consumer;

export class TranslatorProvider extends Component {
    constructor(props) {
        super(props)

        // load config
        Config = props.Config;

        // set language
        let language = (localStorage.getItem(storageKey.lang) || Config.default);

        // load file
        file = Config.list[language].file;

        // set state language
        this.state = {
            language: language
        }

        this.onChangeLanguage = this.onChangeLanguage.bind(this);
    }
    onChangeLanguage(language) {

        if (language !== this.state.language) {
            // set localStorage
            localStorage.setItem(storageKey.lang, language);

            // load file
            file = Config.list[language].file;

            // set state language
            this.setState({ language });
        }
    }
    render() {
        return (
            <Context.Provider value={{
                language: this.state.language,
                onChangeLanguage: this.onChangeLanguage
            }}>
                {this.props.children}
            </Context.Provider>
        )
    }

}


export const T = (text) => {
    return (ReactHtmlParser(file[text] || SetLanguageFile(text)))
}


export const TF = (text, ...args) => {
    return (TranslateFormat(text, args))
}

const TranslateFormat = (text, ...args) => {
    args = args[0];
    let traslatedText = T(text)[0];

    let formatText = traslatedText.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });

    return (formatText)
}

const SetLanguageFile = (text) => {

    let languageFile = (JSON.parse(localStorage.getItem(storageKey.missing)) || {});
    languageFile[text] = text;

    try {
        localStorage.setItem(storageKey.missing, JSON.stringify(languageFile));
    } catch (error) {

    }

    return text;
}

let customLanguage = "";

export class LanguageList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle: false
        }
    }
    render() {
        return (
            <TranslatorContext>
                {({ language, onChangeLanguage }) => {

                    // Custom List
                    if (this.props.Language) {

                        if (customLanguage != this.props.Language)
                            onChangeLanguage(this.props.Language);

                        customLanguage = this.props.Language;
                        return ("");
                    }
                    // Default List
                    else {

                        if (!this.props.Theme) {
                            return (
                                <div {...this.props}>
                                    <ul className="rtc-translator">
                                        {Object.keys(Config.list).map(key => (
                                            <li key={key} value={key} data-selected={(key === language)} onClick={(e) => onChangeLanguage(key)}>
                                                <img src={Config.list[key].icon} alt="Flag" className="rtc-flag" /> <span className="rtc-title">{Config.list[key].text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        } else if (this.props.Theme === "Dropdown") {
                            return (
                                <div {...this.props}>
                                    <div className={"rtc-dropdown " + (this.state.toggle ? "toggle" : "")}>
                                        <button type="button" className="rtc-dropdown-toggle" onClick={(e) => this.setState({ toggle: !this.state.toggle })} ><img src={Config.list[language].icon} alt="Flag" /> {Config.list[language].text}</button>
                                        <div className="rtc-dropdown-menu">
                                            {Object.keys(Config.list).map(key => (
                                                <button key={key} type="button" className="rtc-btn" data-selected={(key === language)} onClick={(e) => { onChangeLanguage(key); this.setState({ toggle: false }) }}><img src={Config.list[key].icon} alt="Flag" className="rtc-flag" /> {Config.list[key].text}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    }


                }}
            </TranslatorContext>)

    }

}