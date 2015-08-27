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
import CanvasEditor from './CanvasEditor.jsx';
import Loader from './Loader.jsx';

/**
 * Main component of the application
 * Handle the different states and handle events coming from underlying components
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
class App extends React.Component {
    constructor() {
        super();

        this.propTypes = {
            dispatcher: React.PropTypes.instanceOf(EventDispatcher).isRequired,
            translator: React.PropTypes.instanceOf(Translator).isRequired,
            options: React.PropTypes.object.isRequired
        };

        this.state = {
            status: 'none',
            loading: false,
            loadingFor: '',
            canvas: null
        };

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleCanvasEditingContinue = this.handleCanvasEditingContinue.bind(this);
        this.handleCanvasEditingCancel = this.handleCanvasEditingCancel.bind(this);

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

    handleCanvasEditingContinue() {
        this.setState({
            status: 'none',
            canvas: null
        });
    }

    handleCanvasEditingCancel() {
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
            rendered.push(<CanvasEditor canvas={this.state.canvas}
                                        dispatcher={this.props.dispatcher}
                                        translator={this.props.translator}
                                        options={this.props.options}
                                        onContinue={this.handleCanvasEditingContinue}
                                        onCancel={this.handleCanvasEditingCancel} />);
        }

        if (this.state.status == 'loading') {
            rendered.push(<Loader label="Envoi du signalement ..." />);
        }

        return <div>{rendered}</div>;
    }
}

export default App;
