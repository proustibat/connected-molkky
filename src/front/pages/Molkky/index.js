import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import gameConfig from '@root/gameConfig';
import socketIOClient from 'socket.io-client';

const Molkky = ({ title }) => {
  const [skittlesState, setSkittlesState] = useState({});
  const colStyle = { width: '25%' };

  useEffect(() => {
    const socket = socketIOClient(gameConfig.socketServer);
    socket.on('UPDATE', (data) => {
      setSkittlesState(data);
    });
  }, []);

  const renderSkittles = () => (
    <table className="striped">
      <thead>
        <tr>
          <th style={colStyle}>Mac</th>
          <th style={colStyle}>Value</th>
          <th style={colStyle}>Position</th>
          <th style={colStyle}>Battery</th>
        </tr>
      </thead>

      <tbody>
        {
          Object.entries(skittlesState)
            .sort(([, { value: valA }], [, { value: valB }]) => {
              let comparison = 0;
              if (valA > valB) {
                comparison = 1;
              } else if (valA < valB) {
                comparison = -1;
              }
              return comparison;
            }).map(([mac, { position, battery, value }]) => (
              <tr key={mac}>
                <td style={colStyle}>{mac}</td>
                <td style={colStyle}>{value}</td>
                <td style={colStyle}>{position}</td>
                <td style={colStyle}>{battery}</td>
              </tr>
            ))
        }
      </tbody>
    </table>
  );

  return (
    <div className="section no-pad-bot">
      <div className="container">
        {title && <h1>{ title }</h1>}
        {renderSkittles()}
      </div>
    </div>
  );
};

Molkky.propTypes = {
  title: PropTypes.string,
};

Molkky.defaultProps = {
  title: null,
};

Molkky.displayName = 'Molkky';

export default Molkky;
