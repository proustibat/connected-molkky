import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

const Molkky = ({ title }) => {
  const [skittlesState, setSkittlesState] = useState({});

  useEffect(() => {
    const socket = socketIOClient('localhost:8888');
    socket.on('UPDATE', (data) => {
      setSkittlesState(data);
    });
  }, []);

  const renderSkittles = () => (
    <table className="striped">
      <thead>
        <tr>
          <th>Mac</th>
          <th>Position</th>
          <th>Battery</th>
        </tr>
      </thead>

      <tbody>
        {
          Object.entries(skittlesState).map(([mac, { position, battery }]) => (
            <tr>
              <td>{mac}</td>
              <td>{position}</td>
              <td>{battery}</td>
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
