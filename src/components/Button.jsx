/*
 * This file is part of the Ademis Feedback library.
 *
 * Copyright (c) 2015 Titouan Galopin <galopintitouan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';
import Translator from '../services/Translator.jsx';

/**
 * Main button in the corner of the website
 * This component only render the button and delegate the event to the App component
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
class Button extends React.Component {
    constructor() {
        super();

        this.propTypes = {
            translator: React.PropTypes.instanceOf(Translator).isRequired,
            onClick: React.PropTypes.func.isRequired
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        return this.props.onClick(event);
    }

    render() {
        return (
            <button onClick={this.handleClick} className="ademis-feedback-button" id="ademis-feedback-button">
                {this.props.translator.translate('button')}
            </button>
        );
    }
}

export default Button;
