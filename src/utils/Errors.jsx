
class Errors {

    /*
     * General
     */
    static incompatibleBrowser(eventName) {
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
