import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../components/Button';
import List from '../../components/List';
import LoadingBar from '../../components/LoadingBar';

export default class Hue extends React.Component {
    static propTypes = {
        title: PropTypes.string
    };

    state = {
        isLoading: false,
        ipaddress: null,
        connectData: null,
        // connectData: {
        //     user: {
        //         username: 'GUn1rnTiYkifD9cAy2d23yFTFZo36ePWzDA4Hgfs'
        //     }
        // },
        rooms: [],
        lights: []
    };

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

    toastError = error => {
        if (typeof window !== 'undefined') {
            const {M: MaterializeCSS} = window;
            MaterializeCSS && MaterializeCSS.toast({html: error, classes: 'red darken-4'});
        }
    };

    render() {
        const {rooms, lights} = this.state;
        return (
            <div className="section no-pad-bot">
                <div className="container">
                    {this.state.isLoading && <LoadingBar/>}
                    {this.props.title && <h1>{ this.props.title }</h1>}

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
                            {this.state.rooms.length > 0 && <List title={`You have ${rooms.length} room${rooms.length > 0 ? 's' : ''}:`} elements={rooms.map(room => room.name)} />}
                            {this.state.lights.length > 0 && <List title={`You have ${lights.length} light${rooms.length > 0 ? 's' : ''}:`} elements={lights.map(light => light.name)} />}
                        </>
                    )}
                </div>
            </div>
        );
    }
}