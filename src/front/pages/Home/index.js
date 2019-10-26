import React from 'react';
import PropTypes from 'prop-types';
import Link from '@components/Link';

const Home = ({ title }) => (
  <div className="section no-pad-bot">
    <div className="container">
      {title && <h1>{ title }</h1>}
      <Link href="/darksky">Wanna know the weather in Paris?</Link>
      <Link href="/hue">Wanna control the lights?</Link>
      <Link href="/molkky">See the molkky state</Link>
      <Link href="/molkky/game">Play Molkky</Link>
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
