import _ from 'underscore';
import EventDispatcher from './services/EventDispatcher.jsx';
import Translator from './services/Translator.jsx';
import Errors from './utils/Errors.jsx';

class AdemisFeedback {
    constructor(options) {
        // Check <canvas> support
        let canvas = document.createElement('canvas');

        if (! canvas.getContext || ! canvas.getContext('2d')) {
            Errors.incompatibleBrowser();
        }

        let defaultOptions = {
            locale: 'en'
        };

        // Options
        this._options = _.extend(defaultOptions, options);

        // HTML container (initialized in AdemisFeedback::start())
        this._container = null;

        // Services
        this._dispatcher = new EventDispatcher();
        this._translator = new Translator(this._options.locale);
    }

    on(eventName, listener) {
        this._dispatcher.on(eventName, listener);
    }

    start() {
        this._container = document.createElement('div');
        this._container.id = 'ademis-feedback';
    }
}

export default AdemisFeedback;
