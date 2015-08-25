import _ from 'underscore';

class AdemisFeedback {

    constructor(options) {
        // Check <canvas> support
        var canvas = document.createElement('canvas');

        if (! canvas.getContext || ! canvas.getContext('2d')) {
            throw new Error('[Ademis Feedback] Your browser is not compatible as it does not support <canvas>');
        }

        this._options = options;

        this._listeners = {
            'button:clicked': [],
            'screenshot:built': [],
            'screenshot:edited': [],
            'report:submit': [],
            'report:sent': []
        };

        this._container = null;
    }

    on(eventName, listener) {
        if (typeof this._listeners[eventName] == 'undefined') {
            throw new Error('[Ademis Feedback] The event name "' + eventName + '" is not valid');
        }

        this._listeners[eventName].push(listener);
    }

    start() {
        this._container = document.createElement('div');
        this._container.id = 'ademis-feedback';
    }

}

export default AdemisFeedback;
