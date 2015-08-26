import _ from 'underscore';
import Errors from '../utils/Errors.jsx';

class Translator {
    constructor(locale) {
        let availableLocales = [ 'fr' ];

        if (! _.contains(availableLocales, locale)) {
            Errors.localeNotFound(locale);
        }

        this._locale = locale;
        this._translations = require('../translations/' + locale + '.json');
    }

    translate(key) {
        if (typeof this._translations[key] == 'undefined') {
            Errors.translationNotFound(key, this._locale);
        }

        return this._translations[key];
    }
}

export default Translator;
