import Button from '@components/Button';
import List from '@components/List';
import LoadingBar from '@components/LoadingBar';
import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';

import styles from './styles';

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
        token: null,
        rooms: null,
        lights: null,
        ipaddressFromStorage: false,
      };
    }

    componentDidMount() {
      this.getLocalData();
    }

    requestDiscover = async () => {
      this.setState(() => ({ isLoading: true }));
      const result = await fetch('/api/hue/discover', { method: 'GET' })
        .then((response) => (response.ok ? response.json() : Promise.reject(response.statusText)))
        .catch(this.toastError);

      this.setState(() => ({
        isLoading: false,
        ipaddress: get(result, 'ipaddress'),
        ipaddressFromStorage: false,
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

      this.setState(
        () => ({
          isLoading: false,
          ...connectData,
        }),
        connectData && this.saveDataLocal,
      );
    };

    requestInfo = async () => {
      const { token } = this.state;
      this.setState(() => ({ isLoading: true, rooms: null, lights: null }));

      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const result = await Promise
        .all([
          fetch('/api/hue/rooms', { method: 'get', headers }).then((resp) => (resp.ok ? resp.json() : Promise.reject(resp.statusText))),
          fetch('/api/hue/lights', { method: 'get', headers }).then((resp) => (resp.ok ? resp.json() : Promise.reject(resp.statusText))),

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

    saveDataLocal = () => {
      const { token, ipaddress } = this.state;
      localStorage.setItem('token', token);
      localStorage.setItem('ipaddress', ipaddress);
    };

    getLocalData = () => {
      const token = localStorage.getItem('token');
      const ipaddress = localStorage.getItem('ipaddress');
      if (token && !ipaddress) {
        localStorage.clear();
      } else {
        this.setState(() => ({
          ...(token && { token }),
          ...(ipaddress && {
            ipaddress,
            ipaddressFromStorage: true,
          }),
        }));
      }
    };

    toastError = (error) => {
      get(window, 'M.toast', () => {})({ html: error, classes: 'red darken-4' });
    };

    render() {
      const { title } = this.props;
      const {
        isLoading, rooms, ipaddress, ipaddressFromStorage, lights, token,
      } = this.state;
      return (
        <div className="section no-pad-bot">
          <div className="container">
            {isLoading && <LoadingBar />}
            {title && <h1>{ title }</h1>}


            {!ipaddress && (
            <Button onClick={this.requestDiscover} disabled={isLoading}>
                    Scan Philips Hue System
            </Button>
            )}

            {ipaddress && (
              <>
                <p style={styles.containerTextWithButton}>
                  <span style={styles.textBeforeButton}>{`${ipaddressFromStorage ? 'Last Bridge Hue Address' : 'Bridge IP detected'}: ${ipaddress}`}</span>
                  <Button
                    onClick={this.requestDiscover}
                    disabled={isLoading}
                    size="btn-small"
                    style={styles.smallButtonInText}
                  >
Re-scan
                  </Button>
                </p>
              </>
            )}

            {ipaddress && !token && (
              <>
                <Button
                  onClick={this.requestConnect}
                  disabled={isLoading}
                >
                    Connect
                </Button>
              </>
            )}

            {token && (
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
