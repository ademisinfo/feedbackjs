/*
 * This file is part of the Ademis Feedback library.
 *
 * Copyright (c) 2015 Titouan Galopin <galopintitouan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Create a screenshot of the current page using html2canvas
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
export default class ScreenshotBuilder {
    static createScreenshot(callback) {
        let button = document.getElementById('ademis-feedback-button');
        button.style.display = 'none';

        html2canvas(document.body, { onrendered: (canvas) => {
            button.style.display = 'block';
            callback(canvas);
        } });
    }
}
