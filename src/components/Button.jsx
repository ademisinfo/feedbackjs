/*
 * This file is part of the Ademis Feedback library.
 *
 * Copyright (c) 2015 Titouan Galopin <galopintitouan@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';

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
            label: React.PropTypes.string.isRequired,
            onClick: React.PropTypes.func
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        return this.props.onClick(event);
    }

    render() {
        return  <button onClick={this.handleClick} className="ademis-feedback-button" id="ademis-feedback-button">
                    {this.props.label}
                </button>;
    }
}

export default Button;
