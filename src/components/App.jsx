/*
 * This file is part of the Ademis Feedback library.
 *
 * Copyright (c) 2015 Titouan Galopin <galopintitouan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';
import EventDispatcher from '../services/EventDispatcher.jsx';
import Translator from '../services/Translator.jsx';
import ScreenshotBuilder from '../utils/ScreenshotBuilder.jsx';
import Button from './Button.jsx';
import EditorInterface from './editor/EditorInterface.jsx';
import Loader from './Loader.jsx';

/**
 * Main component of the application
 * Handle the different states and handle events coming from underlying components
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
export default class App extends React.Component {
    constructor() {
        super();

        this.propTypes = {
            dispatcher: React.PropTypes.instanceOf(EventDispatcher).isRequired,
            translator: React.PropTypes.instanceOf(Translator).isRequired,
            options: React.PropTypes.object.isRequired
        };

        this.state = {
            status: 'none',
            isLoading: false,
            loadingFor: '',
            canvas: null
        };

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleEditorSubmit = this.handleEditorSubmit.bind(this);
        this.handleEditorCancel = this.handleEditorCancel.bind(this);

        setTimeout(() => { this.handleButtonClick(); }, 500);
    }

    handleButtonClick() {
        ScreenshotBuilder.createScreenshot((canvas) => {
            this.setState({
                status: 'editing',
                canvas: canvas
            });
        });
    }

    handleEditorSubmit() {
        this.setState({
            status: 'none',
            canvas: null
        });
    }

    handleEditorCancel() {
        this.setState({
            status: 'none',
            canvas: null
        });
    }

    render() {
        let rendered = [];

        if (this.state.status == 'none') {
            rendered.push(<Button translator={this.props.translator} onClick={this.handleButtonClick} />);
        }

        if (this.state.status == 'editing') {
            rendered.push(<EditorInterface canvas={this.state.canvas}
                                           dispatcher={this.props.dispatcher}
                                           translator={this.props.translator}
                                           options={this.props.options}
                                           onSubmit={this.handleEditorSubmit}
                                           onCancel={this.handleEditorCancel} />);
        }

        if (this.state.isLoading) {
            rendered.push(<Loader label="Envoi du signalement ..." />);
        }

        return <div>{rendered}</div>;
    }
}
