/*
 * This file is part of the Ademis Feedback library.
 *
 * Copyright (c) 2015 Titouan Galopin <galopintitouan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';
import Fabric from '../../utils/Fabric.jsx';

/**
 * Editor canvas
 * Provide edition core features using Fabric
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
class EditorCanvas extends React.Component {
    constructor() {
        super();

        this.propTypes = {
            background: React.PropTypes.string.isRequired,
            mode: React.PropTypes.string.isRequired,
            width: React.PropTypes.number.isRequired,
            height: React.PropTypes.number.isRequired
        };

        this._original = null;
        this._canvas = null;
        this._fabric = null;
        this._overlay = null;

        this._mouse = {
            isDraging: false,
            initialDragPosition: {
                x: 0,
                y: 0
            }
        };

        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragMove = this.handleDragMove.bind(this);
        this.handleDragStop = this.handleDragStop.bind(this);
    }

    componentDidMount() {
        this._original = this.props.background;
        this._canvas = document.getElementById('ademis-feedback-editor-canvas');
        this._fabric = Fabric.newInstanceFromCanvas(this._canvas, this.props.width, this.props.height);
        this._overlay = Fabric.createOverlay(this.props.width, this.props.height);

        fabric.Image.fromURL(this.props.background, (image) => {
            image.selectable = false;
            image.hasControls = false;
            image.hasBorders = false;

            this._fabric.add(image);
            this._fabric.add(this._overlay);

            this._fabric.observe('mouse:down', this.handleDragStart);
            this._fabric.observe('mouse:move', this.handleDragMove);
            this._fabric.observe('mouse:up', this.handleDragStop);
        });
    }

    handleDragStart(event) {
        this._mouse.isDraging = true;

        let mouse = this._fabric.getPointer(event.e);
        this._mouse.initialDragPosition.x = mouse.x;
        this._mouse.initialDragPosition.y = mouse.y;

        let square = new fabric.Rect({
            width: 0,
            height: 0,
            left: this._mouse.initialDragPosition.x,
            top: this._mouse.initialDragPosition.y,
            fill: 'transparent',
            selectable: false,
            hasControls: false,
            hasBorders: false,
            stroke: '#37474F',
            strokeWidth: 3
        });

        this._fabric.add(square);
        this._fabric.setActiveObject(square);
    }

    handleDragMove(event) {
        if (! this._mouse.isDraging) {
            return;
        }

        let width = event.e.clientX - this._mouse.initialDragPosition.x;
        let height = event.e.clientY - this._mouse.initialDragPosition.y;

        if (! width || ! height) {
            return false;
        }

        var square = this._fabric.getActiveObject();
        square.set('width', width);
        square.set('height', height);

        this._fabric.bringToFront(square);
    }

    handleDragStop(event) {
        this._mouse.isDraging = false;

        let top = event.e.clientY;
        let left = event.e.clientX;

        if (top > this._mouse.initialDragPosition.y) {
            top = this._mouse.initialDragPosition.y;
        }

        if (left > this._mouse.initialDragPosition.x) {
            left = this._mouse.initialDragPosition.x;
        }

        let width = Math.abs(event.e.clientX - this._mouse.initialDragPosition.x);
        let height = Math.abs(event.e.clientY - this._mouse.initialDragPosition.y);

        let croppedData = Fabric.getCroppedDataUri(
            this._original,
            this.props.width,
            this.props.height,
            top + 2, // Compensate stroke
            left + 2, // Compensate stroke
            width,
            height
        );

        fabric.Image.fromURL(croppedData, (croppedImage) => {
            croppedImage.top = top;
            croppedImage.left = left;
            croppedImage.selectable = false;
            croppedImage.hasControls = false;
            croppedImage.hasBorders = false;
            croppedImage.stroke = '#37474F';
            croppedImage.strokeWidth = 3;

            this._fabric.add(croppedImage);
        });
    }

    render() {
        return (
            <canvas id="ademis-feedback-editor-canvas" className="ademis-feedback-editor-canvas"
                    style={{ width: this.props.width, height: this.props.height }}></canvas>
        );
    }
}

export default EditorCanvas;
