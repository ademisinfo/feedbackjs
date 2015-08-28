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
 * Register listeners for given events names and dispatch these events to listeners
 * Let the external scripts execute actions at key moments of the library
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
export default class EventDispatcher {
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
