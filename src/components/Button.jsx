import React from 'react';

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
