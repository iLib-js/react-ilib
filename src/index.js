import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {addLocaleData, IntlProvider} from 'react-intl';

import en from "react-intl/locale-data/en";
import de from "react-intl/locale-data/de";
import ru from "react-intl/locale-data/ru";

import translations_en from './translations/en';
import translations_de from './translations/de';
import translations_ru from './translations/ru';

addLocaleData([...en, ...de, ...ru]);
var messages = {
    "en": translations_en,
    "de": translations_de,
    "ru": translations_ru
};

ReactDOM.render(
    <IntlProvider locale="de" messages={messages["de"]}>
        <App />
    </IntlProvider>, 
    document.getElementById('root'));
registerServiceWorker();
