/*
 * This file is part of the Ademis Feedback library.
 *
 * Copyright (c) 2015 Titouan Galopin <galopintitouan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Detect when the DOM is loaded and ready.
 *
 * @author Diego Perini (diego.perini at gmail.com)
 * @see https://github.com/dperini/ContentLoaded
 */
export default class ContentLoaded {

    /*
     * Execute a given callback when the DOM is ready
     */
    static onDomReady(callback) {
        var done = false, top = true,

            doc = window.document,
            root = doc.documentElement,
            modern = doc.addEventListener,

            add = modern ? 'addEventListener' : 'attachEvent',
            rem = modern ? 'removeEventListener' : 'detachEvent',
            pre = modern ? '' : 'on',

            init = function(e) {
                if (e.type == 'readystatechange' && doc.readyState != 'complete') return;
                (e.type == 'load' ? window : doc)[rem](pre + e.type, init, false);
                if (!done && (done = true)) callback.call(window, e.type || e);
            },

            poll = function() {
                try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
                init('poll');
            };

        if (doc.readyState == 'complete') {
            callback.call(window, 'lazy');
        } else {
            if (!modern && root.doScroll) {
                try { top = !window.frameElement; } catch(e) { }
                if (top) poll();
            }

            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            window[add](pre + 'load', init, false);
        }
    }

}
