import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Button from '../../components/Button';
import List from '../../components/List';
import LoadingBar from '../../components/LoadingBar';

export default class Hue extends React.Component {
    static displayName = 'Hue';

    static propTypes = {
      title: PropTypes.string,
    };

    static defaultProps = {
      title: null,
    };

    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
        ipaddress: null,
        connectData: null,
        rooms: null,
        lights: null,
      };
    }

    requestDiscover = async () => {
      this.setState(() => ({ isLoading: true }));
      const result = await fetch('/api/hue/discover', { method: 'GET' })
        .then((response) => (response.ok ? response.json() : Promise.reject(response.statusText)))
        .catch(this.toastError);

      this.setState(() => ({
        isLoading: false,
        ipaddress: get(result, 'ipaddress'),
      }));
    };

    requestConnect = async () => {
      const { ipaddress } = this.state;
      this.setState(() => ({ isLoading: true }));
      const connectData = await fetch('/api/hue/connect', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ipaddress }),
      })
        .then((response) => (response.ok ? response.json() : Promise.reject(response.statusText)))
        .catch(this.toastError);

      this.setState(() => ({
        isLoading: false,
        connectData,
      }));
    };

    requestInfo = async () => {
      const { ipaddress, connectData } = this.state;
      this.setState(() => ({ isLoading: true }));

      const roomsEndpoint = `/api/hue/rooms?ipaddress=${ipaddress}&username=${connectData.user.username}`;
      const lightsEndpoint = `/api/hue/lights?ipaddress=${ipaddress}&username=${connectData.user.username}`;

      const result = await Promise
        .all([
          fetch(roomsEndpoint, { method: 'get' }).then((resp) => (resp.ok ? resp.json() : Promise.reject(resp.statusText))),
          fetch(lightsEndpoint, { method: 'get' }).then((resp) => (resp.ok ? resp.json() : Promise.reject(resp.statusText))),

        ])
        .then((response) => ({
          rooms: response[0] || [],
          lights: response[1] || [],
        }))
        .catch(this.toastError);

      this.setState(() => ({
        isLoading: false,
        ...result,
      }));
    };

    renderConnectData = () => {
      const { connectData: { message, user: { username } } } = this.state;
      return (
        <>
          <p>{message}</p>
          <p>{`You're connected as ${username}`}</p>
        </>
      );
    };

    toastError = (error) => {
      get(window, 'M.toast', () => {})({ html: error, classes: 'red darken-4' });
    };

    render() {
      const { title } = this.props;
      const {
        isLoading, rooms, ipaddress, lights, connectData,
      } = this.state;
      return (
        <div className="section no-pad-bot">
          <div className="container">
            {isLoading && <LoadingBar />}
            {title && <h1>{ title }</h1>}

            <Button onClick={this.requestDiscover} disabled={isLoading}>
                Scan Philips Hue System
            </Button>

            {ipaddress && (
              <>
                <p>
Bridge IP detected:
                  {ipaddress}
                </p>

                <Button onClick={this.requestConnect} disabled={isLoading}>Connect</Button>
                {connectData && this.renderConnectData()}
              </>
            )}

            {connectData && (
              <>
                <Button onClick={this.requestInfo} disabled={isLoading}>
                    Get information about your home
                </Button>
                {rooms && <List title={`You have ${rooms.length} room${rooms.length > 1 ? 's' : ''}${rooms.length > 0 ? ':' : ''}`} elements={rooms.map((room) => room.name)} />}
                {lights && <List title={`You have ${lights.length} light${rooms.length > 1 ? 's' : ''}${lights.length > 0 ? ':' : ''}`} elements={lights.map((light) => light.name)} />}
              </>
            )}
          </div>
        </div>
      );
    }
}
