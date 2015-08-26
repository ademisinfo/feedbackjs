/*
 * This file is part of the Ademis Feedback library.
 *
 * Copyright (c) 2015 Titouan Galopin <galopintitouan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Centralized way to throw errors with useful messages for the developer
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
class Errors {

    /*
     * General
     */
    static incompatibleBrowser() {
        throw new Error(
            '[Ademis Feedback] Your browser is not compatible as it does not support <canvas>'
        );
    }

    /*
     * Translator
     */
    static localeNotFound(locale) {
        throw new Error(
            '[Ademis Feedback] The translation locale "' + locale + '" was not found'
        );
    }

    static translationNotFound(key, locale) {
        throw new Error(
            '[Ademis Feedback] The translation key "' + key + '" in locale "' + locale + '" was not found'
        );
    }

    /*
     * Event dispatcher
     */
    static eventCanNotBeRegistered(eventName) {
        throw new Error(
            '[Ademis Feedback] The event "' + eventName + '" can not be registered as it is not valid'
        );
    }

    static eventCanNotBeEmited(eventName) {
        throw new Error(
            '[Ademis Feedback] The event "' + eventName + '" can not be emited as it is not valid'
        );
    }

}

export default Errors;
