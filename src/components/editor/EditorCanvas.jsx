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
export default class EditorCanvas extends React.Component {
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
        this._arrow = null;

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

        if (this.props.mode == 'highlight' || this.props.mode == 'hide') {
            let square = new fabric.Rect({
                width: 0,
                height: 0,
                left: mouse.x,
                top: mouse.y,
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

        if (this.props.mode == 'arrow') {
            let line = new fabric.Line([mouse.x, mouse.y, mouse.x, mouse.y], {
                selectable: false,
                hasControls: false,
                hasBorders: false,
                stroke: '#FFD740',
                strokeWidth: 5,
                originX: 'center',
                originY: 'center'
            });

            this._fabric.add(line);
            this._fabric.setActiveObject(line);
        }
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

        if (this.props.mode == 'highlight' || this.props.mode == 'hide') {
            let square = this._fabric.getActiveObject();

            square.set('width', width);
            square.set('height', height);

            this._fabric.bringToFront(square);
        }

        if (this.props.mode == 'arrow') {
            if (this._arrow) {
                this._fabric.remove(this._arrow);
                this._arrow = null;
            }

            let line = this._fabric.getActiveObject();

            line.set('x2', event.e.clientX);
            line.set('y2', event.e.clientY);

            this._arrow = Fabric.createArrowOnLine([
                this._mouse.initialDragPosition.x,
                this._mouse.initialDragPosition.y,
                event.e.clientX,
                event.e.clientY
            ]);

            this._fabric.add(this._arrow);

            this._fabric.bringToFront(line);
            this._fabric.bringToFront(this._arrow);
        }
    }

    handleDragStop(event) {
        this._mouse.isDraging = false;

        // Remove temporary
        this._fabric.remove(this._fabric.getActiveObject());

        if (this._arrow) {
            this._fabric.remove(this._arrow);
            this._arrow = null;
        }

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

        if (this.props.mode == 'highlight') {
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

        if (this.props.mode == 'hide') {
            this._fabric.add(new fabric.Rect({
                top: top,
                left: left,
                width: width,
                height: height,
                fill: '#37474F',
                selectable: false,
                hasControls: false,
                hasBorders: false,
                stroke: '#37474F',
                strokeWidth: 3
            }));
        }

        if (this.props.mode == 'arrow') {
            let points = [
                this._mouse.initialDragPosition.x,
                this._mouse.initialDragPosition.y,
                event.e.clientX,
                event.e.clientY
            ];

            this._fabric.add(new fabric.Line(points, {
                selectable: false,
                hasControls: false,
                hasBorders: false,
                stroke: '#FFD740',
                strokeWidth: 5,
                originX: 'center',
                originY: 'center'
            }));

            this._fabric.add(Fabric.createArrowOnLine(points));
        }
    }

    render() {
        return (
            <canvas id="ademis-feedback-editor-canvas" className="ademis-feedback-editor-canvas"
                    style={{ width: this.props.width, height: this.props.height }}></canvas>
        );
    }
}
