import Link from '@components/Link';
import PropTypes from 'prop-types';
import React from 'react';

const Home = ({ title }) => (
  <div className="section no-pad-bot">
    <div className="container">
      {title && <h1>{ title }</h1>}
      <p>
        <Link href="/molkky">See the molkky state</Link>
        <Link href="/molkky/game">Play Molkky</Link>
      </p>
    </div>
  </div>
);

Home.propTypes = {
  title: PropTypes.string,
};

Home.defaultProps = {
  title: null,
};

Home.displayName = 'Home';

export default Home;
