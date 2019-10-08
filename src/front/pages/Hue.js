import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../components/Button';
import LoadingBar from '../components/LoadingBar';

export default class Hue extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired
    };

    state = {
        isLoading: false,
        ipaddress: null,
        connectData: null,
        rooms: [],
        lights: []
    };

    componentDidMount() {
        if (typeof window !== 'undefined') {
            require('materialize-css');
        }
    }

    requestDiscover = async () => {
        this.setState(() => ({isLoading: true}));
        const result = await fetch('/api/hue/discover', {method: 'GET'})
            .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
            .catch(this.toastError);

        this.setState(() => ({
            isLoading: false,
            ipaddress: get(result, 'ipaddress')
        }));
    };

    requestConnect = async () => {
        this.setState(() => ({isLoading: true}));
        const connectData = await fetch('/api/hue/connect', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ipaddress:  this.state.ipaddress})
        })
            .then(response => response.ok ? response.json() : Promise.reject(response.statusText))
            .catch(this.toastError);

        this.setState(() => ({
            isLoading: false,
            connectData
        }));
    };

    requestInfo = async () => {
        this.setState(() => ({isLoading: true}));

        const result = await Promise
            .all([
                fetch(`/api/hue/rooms?ipaddress=${this.state.ipaddress}&username=${this.state.connectData.user.username}`, {method: 'get'})
                    .then(response => response.ok ? response.json() : Promise.reject(response.statusText)),
                fetch(`/api/hue/lights?ipaddress=${this.state.ipaddress}&username=${this.state.connectData.user.username}`, {method: 'get'})
                    .then(response => response.ok ? response.json() : Promise.reject(response.statusText))

            ])
            .then(response => {
                return {
                    rooms: response[0] || [],
                    lights: response[1] || []
                };
            })
            .catch(this.toastError);

        this.setState(() => ({
            isLoading: false,
            ...result
        }));
    };

    renderConnectData = () => {
        const {connectData: {message, user: {username}}} = this.state;
        return (
            <>
                <p>{message}</p>
                <p>You're connected as {username}</p>
            </>
        );
    };

    renderRooms = () => {
        const {rooms} = this.state;
        return (
            <>
                <p>You have {rooms.length} room{`${rooms.length > 0 ? 's' : ''}`}:</p>
                <ul className="collection">
                    {rooms.map(room => <li className="collection-item">{room.name}</li>)}
                </ul>
            </>
        );
    };

    renderLights = () => {
        const {lights} = this.state;
        return (
            <>
                <p>You have {lights.length} light{`${lights.length > 0 ? 's' : ''}`}:</p>
                <ul className="collection">
                    {lights.map(light => <li className="collection-item">{light.name}</li>)}
                </ul>
            </>
        );
    };

    toastError = error => {
        M && M.toast({html: error, classes: 'red darken-4'});
    };

    render() {
        return (
            <div className="section no-pad-bot">
                <div className="container">
                    {this.state.isLoading && <LoadingBar/>}
                    <h1>{ this.props.title }</h1>

                    <Button onClick={this.requestDiscover} disabled={this.state.isLoading}>Scan Philips Hue System</Button>

                    {this.state.ipaddress && (
                        <>
                            <p>Bridge IP detected: {this.state.ipaddress}</p>

                            <Button onClick={this.requestConnect} disabled={this.state.isLoading}>Connect</Button>
                            {this.state.connectData && this.renderConnectData()}
                        </>
                    )}

                    {this.state.connectData && (
                        <>
                            <Button onClick={this.requestInfo} disabled={this.state.isLoading}>Get information about your home</Button>
                            {this.state.rooms.length > 0 && this.renderRooms()}
                            {this.state.lights.length > 0 && this.renderLights()}
                        </>
                    )}
                </div>
            </div>
        );
    }
}