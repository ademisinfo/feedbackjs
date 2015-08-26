import React from 'react';
import EventDispatcher from '../services/EventDispatcher.jsx';
import Translator from '../services/Translator.jsx';
import Button from './Button.jsx';

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
            canvas: null
        };

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(event) {
        console.log(event);
    }

    render() {
        let translator = this.props.translator;
        let rendered = [];

        if (this.state.status == 'none') {
            rendered.push(<Button label={translator.translate('button')} onClick={this.handleButtonClick} />);
        }

        return <div>{rendered}</div>;
    }
}

export default App;
