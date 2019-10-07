import React from 'react';
import PropTypes from 'prop-types';

export default class Home extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired
    };

    onClick = () => {
        window.alert('action');
    };

    render() {
        return (
            <div className="section no-pad-bot">
                <div className="container">
                    <h1>{ this.props.title }</h1>
                    <a className="waves-effect waves-light btn-large" href="/weather" >Wanna know the weather in Paris?</a>
                    <a className="waves-effect waves-light btn-large" href="/darksky" >Weather in SSR ?</a>
                    <a className="waves-effect waves-light btn-large" href="/hue" >Wanna control the lights?</a>
                    <a className="waves-effect waves-light btn-large" onClick={this.onClick} >ACTION!</a>
                </div>
            </div>
        );
    }
}