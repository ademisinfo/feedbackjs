import _ from 'underscore';
import Errors from '../utils/Errors.jsx';

class EventDispatcher {
    constructor() {
        this._listeners = {
            'button:clicked': [],
            'screenshot:built': [],
            'screenshot:edited': [],
            'report:submit': [],
            'report:sent': []
        };
    }

    on(eventName, listener) {
        if (typeof this._listeners[eventName] == 'undefined') {
            Errors.eventCanNotBeRegistered(eventName);
        }

        this._listeners[eventName].push(listener);
    }

    emit(eventName, payload) {
        if (typeof this._listeners[eventName] == 'undefined') {
            Errors.eventCanNotBeEmited(eventName);
        }

        for (let listener of this._listeners[eventName]) {
            payload = listener(payload);
        }

        return payload;
    }
}

export default EventDispatcher;
