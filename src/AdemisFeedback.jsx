import _ from 'underscore';
import React from 'react';
import EventDispatcher from './services/EventDispatcher.jsx';
import Translator from './services/Translator.jsx';
import Errors from './utils/Errors.jsx';
import App from './components/App.jsx';

class AdemisFeedback {
    constructor(options) {
        // Check <canvas> support
        let canvas = document.createElement('canvas');

        if (! canvas.getContext || ! canvas.getContext('2d')) {
            Errors.incompatibleBrowser();
        }

        this._container = null;
        this._stylesheet = null;

        let defaultOptions = {
            locale: 'en',
            theme: '/themes/default/feedback.css'
        };

        // Options
        this._options = _.extend(defaultOptions, options);

        // Services
        this._dispatcher = new EventDispatcher();
        this._translator = new Translator(this._options.locale);
    }

    on(eventName, listener) {
        this._dispatcher.on(eventName, listener);
    }

    start() {
        // Create stylesheet
        this._stylesheet = document.createElement('link');
        this._stylesheet.rel = 'stylesheet';
        this._stylesheet.type = 'text/css';
        this._stylesheet.href = this._options.theme;

        document.head.appendChild(this._stylesheet);

        // Create HTML container
        this._container = document.createElement('div');
        this._container.id = 'ademis-feedback';

        document.body.appendChild(this._container);

        React.render(
            <App dispatcher={this._dispatcher} translator={this._translator} options={this._options} />,
            this._container
        );
    }
}

export default AdemisFeedback;
