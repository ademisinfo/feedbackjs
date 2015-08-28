/*
 * This file is part of the Ademis Feedback library.
 *
 * Copyright (c) 2015 Titouan Galopin <galopintitouan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import _ from 'underscore';
import React from 'react';
import EventDispatcher from './services/EventDispatcher.jsx';
import Translator from './services/Translator.jsx';
import Errors from './utils/Errors.jsx';
import App from './components/App.jsx';

/**
 * Main entrypoint for the library
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
class AdemisFeedback {
    constructor(options) {
        // Check <canvas> support
        let canvas = document.createElement('canvas');

        if (! canvas.getContext || ! canvas.getContext('2d')) {
            Errors.incompatibleBrowser();
        }

        let defaultOptions = {
            locale: 'en',
            theme: '/themes/default/feedback.css',
            dependencies: {
                html2canvas: '//cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js',
                fabric: '//cdnjs.cloudflare.com/ajax/libs/fabric.js/1.5.0/fabric.min.js'
            },
            context: {
                browser: true,
                plugins: true,
                html: true,
                url: true
            }
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
        // Load dependencies
        document.head.appendChild(this._createScript(this._options.dependencies.html2canvas));
        document.head.appendChild(this._createScript(this._options.dependencies.fabric));

        // Load theme
        document.head.appendChild(this._createStylesheet(this._options.theme));

        // Create HTML container
        let container = document.createElement('div');
        container.id = 'ademis-feedback';

        document.body.appendChild(container);

        React.render(
            <App dispatcher={this._dispatcher} translator={this._translator} options={this._options} />,
            container
        );
    }

    _createScript(src) {
        let script = document.createElement('script');

        script.type = 'text/javascript';
        script.src = src;

        return script;
    }

    _createStylesheet(href) {
        let stylesheet = document.createElement('link');

        stylesheet.rel = 'stylesheet';
        stylesheet.type = 'text/css';
        stylesheet.href = href;

        return stylesheet;
    }
}

export default AdemisFeedback;
