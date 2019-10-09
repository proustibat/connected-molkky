import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../components/Link';

const Home = ({title}) => (
    <div className="section no-pad-bot">
        <div className="container">
            {title && <h1>{ title }</h1>}
            <Link href="/darksky" >Wanna know the weather in Paris?</Link>
            <Link href="/hue" >Wanna control the lights?</Link>
        </div>
    </div>
);

Home.propTypes = {
    title: PropTypes.string
};

Home.displayName = 'Home';

export default Home;