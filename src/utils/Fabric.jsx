/*
 * This file is part of the Ademis Feedback library.
 *
 * Copyright (c) 2015 Titouan Galopin <galopintitouan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 * Create library specific Fabric objects
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
export default class Fabric {

    static newInstanceFromCanvas(canvas, width, height) {
        return new fabric.Canvas(canvas, {
            width: width,
            height: height,
            defaultCursor: 'crosshair',
            selection: false
        });
    }

    static createOverlay(width, height) {
        return new fabric.Rect({
            top: 0,
            left: 0,
            width: width,
            height: height,
            fill: 'rgba(0, 0, 0, 0.5)',
            selectable: false,
            hasControls: false,
            hasBorders: false
        });
    }

    static getCroppedDataUri(originalData, originalWidth, originalHeight, top, left, width, height) {
        let original = new Image();
        original.src = originalData;

        let originalCanvas = document.createElement('canvas');
        originalCanvas.width = originalWidth;
        originalCanvas.height = originalHeight;
        let originalContext = originalCanvas.getContext('2d');
        originalContext.drawImage(original, 0, 0);

        let croppedData = originalContext.getImageData(left, top, width, height);

        let croppedCanvas = document.createElement('canvas');
        croppedCanvas.width = width;
        croppedCanvas.height = height;
        croppedCanvas.getContext('2d').putImageData(croppedData, 0, 0);

        return croppedCanvas.toDataURL('image/png');
    }

}
