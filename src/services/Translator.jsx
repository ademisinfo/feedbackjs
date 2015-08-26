/*
 * This file is part of the Ademis Feedback library.
 *
 * Copyright (c) 2015 Titouan Galopin <galopintitouan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import _ from 'underscore';
import Errors from '../utils/Errors.jsx';

/**
 * Provide translations features for the library components
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
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
