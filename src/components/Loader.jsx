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
 * Loader layer
 *
 * @author Titouan Galopin <galopintitouan@gmail.com>
 */
class Loader extends React.Component {
    constructor() {
        super();

        this.propTypes = {
            label: React.PropTypes.string.isRequired
        };
    }

    render() {
        return (
            <div className="ademis-feedback-loader">
                <div className="ademis-feedback-loader-inner">
                    <h1 className="ademis-feedback-loader-title">
                        {this.props.label}
                    </h1>
                    <div className="ademis-feedback-loader-slider">
                        <div className="ademis-feedback-loader-line"></div>
                        <div className="ademis-feedback-loader-break ademis-feedback-loader-dot1"></div>
                        <div className="ademis-feedback-loader-break ademis-feedback-loader-dot2"></div>
                        <div className="ademis-feedback-loader-break ademis-feedback-loader-dot3"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Loader;
