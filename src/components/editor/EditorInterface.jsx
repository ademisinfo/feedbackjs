/*
 * This file is part of the Ademis Feedback library.
 *
 * Copyright (c) 2015 Titouan Galopin <galopintitouan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';
import EventDispatcher from '../../services/EventDispatcher.jsx';
import Translator from '../../services/Translator.jsx';
import EditorCanvas from './EditorCanvas.jsx';

/**
 * Editor interface
 * Provide a sidebar for different edition modes, use the
 * CanvasRenderer for real edition and the FormWindow for
 * details about the problem
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
class EditorInterface extends React.Component {
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

        this.state = {
            mode: 'highlight',
            shapes: []
        };

        this.handleHighlightButtonClick = this.handleHighlightButtonClick.bind(this);
        this.handleHideButtonClick = this.handleHideButtonClick.bind(this);
        this.handleArrowButtonClick = this.handleArrowButtonClick.bind(this);
        this.handleHelpButtonClick = this.handleHelpButtonClick.bind(this);
        this.handleContinueButtonClick = this.handleContinueButtonClick.bind(this);
        this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflow = 'auto';
    }

    handleHighlightButtonClick() {
        this.setState({ mode: 'highlight' });
    }

    handleHideButtonClick() {
        this.setState({ mode: 'hide' });
    }

    handleArrowButtonClick() {
        this.setState({ mode: 'arrow' });
    }

    handleHelpButtonClick() {
        this.setState({ mode: 'help' });
    }

    handleContinueButtonClick() {
        this.props.onContinue();
    }

    handleCancelButtonClick() {
        this.props.onCancel();
    }

    render() {
        let translator = this.props.translator;

        return (
            <div className="ademis-feedback-editor" id="ademis-feedback-editor">
                <div className="ademis-feedback-editor-sidebar">
                    <h2 className="ademis-feedback-editor-title">
                        {translator.translate('title')}
                    </h2>
                    <ul>
                        <li className={this.state.mode == 'highlight' ? 'ademis-feedback-editor-sidebar-active' : ''}
                            onClick={this.handleHighlightButtonClick}>
                            <i className="ademis-feedback-icon-highlight"></i><br />
                            <span>{translator.translate('editor_highlight')}</span>
                        </li>
                        <li className={this.state.mode == 'hide' ? 'ademis-feedback-editor-sidebar-active' : ''}
                            onClick={this.handleHideButtonClick}>
                            <i className="ademis-feedback-icon-hide"></i><br />
                            <span>{translator.translate('editor_hide')}</span>
                        </li>
                        <li className={this.state.mode == 'arrow' ? 'ademis-feedback-editor-sidebar-active' : ''}
                            onClick={this.handleArrowButtonClick}>
                            <i className="ademis-feedback-icon-arrow"></i><br />
                            <span>{translator.translate('editor_arrow')}</span>
                        </li>
                    </ul>
                    <ul className="ademis-feedback-editor-sidebar-bottom">
                        <li onClick={this.handleHelpButtonClick}>
                            <i className="ademis-feedback-icon-help"></i><br />
                            <span>{translator.translate('editor_help')}</span>
                        </li>
                    </ul>
                </div>

                <EditorCanvas background={this.props.canvas.toDataURL()}
                              mode={this.state.mode}
                              width={this.props.canvas.width}
                              height={this.props.canvas.height} />
            </div>
        );
    }
}

export default EditorInterface;
