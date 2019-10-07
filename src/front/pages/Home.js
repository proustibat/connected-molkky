import React from 'react';

export default class Home extends React.Component {
    onClick = () => {
        window.alert('action');
    };

    render() {
        return (
            <div>
                <h1>{ this.props.title }</h1>
                <a className="waves-effect waves-light btn-large" href="/weather" >Wanna know the weather in Paris?</a>
                <a className="waves-effect waves-light btn-large" href="/hue" >Wanna control the lights?</a>
                <a className="waves-effect waves-light btn-large" onClick={this.onClick} >ACTION!</a>
            </div>
        );
    }
}