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

/**
 * Main button in the corner of the website
 * This component only render the button and delegate the event to the App component
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
class CanvasEditor extends React.Component {
    constructor() {
        super();

        this.propTypes = {
            canvas: React.PropTypes.object.isRequired,
            dispatcher: React.PropTypes.instanceOf(EventDispatcher).isRequired,
            translator: React.PropTypes.instanceOf(Translator).isRequired,
            options: React.PropTypes.object.isRequired,
            onContinue: React.PropTypes.func.isRequired,
            onCancel: React.PropTypes.func.isRequired
        };

        this.editor = null;
        this.width = 0;
        this.height = 0;

        this.state = {
            mode: 'comment',
            canvas: null
        };

        this.handleCommentButtonClick = this.handleCommentButtonClick.bind(this);
        this.handleHideButtonClick = this.handleHideButtonClick.bind(this);
        this.handleArrowButtonClick = this.handleArrowButtonClick.bind(this);
        this.handleContinueButtonClick = this.handleContinueButtonClick.bind(this);
        this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflow = 'auto';
    }

    handleCommentButtonClick() {
        this.setState({ mode: 'comment' });
    }

    handleHideButtonClick() {
        this.setState({ mode: 'hide' });
    }

    handleArrowButtonClick() {
        this.setState({ mode: 'arrow' });
    }

    handleContinueButtonClick() {
        this.props.onContinue(this.canvas);
    }

    handleCancelButtonClick() {
        this.props.onCancel(this.canvas);
    }

    render() {
        let editorBackground = { backgroundImage: 'url(' + this.props.canvas.toDataURL() + ')' };

        return (
            <div className="ademis-feedback-editor" id="ademis-feedback-editor" style={editorBackground}>
                <div className="ademis-feedback-editor-sidebar">
                    <h2 className="ademis-feedback-editor-title">Feedback</h2>
                    <ul>
                        <li className={this.state.mode == 'comment' ? 'ademis-feedback-editor-sidebar-active' : ''}
                            onClick={this.handleCommentButtonClick}>
                            <i className="ademis-feedback-icon-comment"></i><br />
                            <span>Comment</span>
                        </li>
                        <li className={this.state.mode == 'hide' ? 'ademis-feedback-editor-sidebar-active' : ''}
                            onClick={this.handleHideButtonClick}>
                            <i className="ademis-feedback-icon-hide"></i><br />
                            <span>Hide</span>
                        </li>
                        <li className={this.state.mode == 'arrow' ? 'ademis-feedback-editor-sidebar-active' : ''}
                            onClick={this.handleArrowButtonClick}>
                            <i className="ademis-feedback-icon-arrow"></i><br />
                            <span>Arrow</span>
                        </li>
                    </ul>
                    <ul className="ademis-feedback-editor-sidebar-bottom">
                        <li onClick={this.handleCancelButtonClick}>
                            <i className="ademis-feedback-icon-cancel"></i><br />
                            <span>Cancel</span>
                        </li>
                        <li onClick={this.handleContinueButtonClick}>
                            <i className="ademis-feedback-icon-continue"></i><br />
                            <span>Continue</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default CanvasEditor;
