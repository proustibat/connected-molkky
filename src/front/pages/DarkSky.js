import React from 'react';

export default class DarkSky extends React.Component {
    onClick = () => {
      window.alert('click');
    };
    render() {
        return (
            <div>
                <h1>{ this.props.title }</h1>
                <h2>This is my react page</h2>
                <a className="waves-effect waves-light btn-large" onClick={this.onClick} >Click me</a>
            </div>
        );
    }
}