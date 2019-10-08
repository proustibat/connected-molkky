import React from 'react';
import PropTypes from 'prop-types';
import DarkSkyIcon from '../../components/DarkSkyIcon';
import List from '../../components/List';

const DarkSky = ({timezone, latitude, longitude, currently, icon, summary, time}) => (
    <div className="section no-pad-bot">
        <div className="container">
            <h1><i className="material-icons medium">language</i><span>{timezone}</span></h1>
            <h2><span>{summary}</span><DarkSkyIcon icon={icon} /></h2>
            <h3><i className="material-icons small">location_on</i><span>{latitude}, {longitude}</span></h3>
            <p>({time.toString()})</p>
            <List elements={
                Object
                    .entries(currently)
                    .map(info => `${info[0]}: ${info[1]}`)
            } />
        </div>
    </div>
);

DarkSky.propTypes = {
    timezone: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    time: PropTypes.object.isRequired,
    currently: PropTypes.shape({
        apparentTemperature: PropTypes.number,
        cloudCover: PropTypes.number,
        dewPoint: PropTypes.number,
        humidity: PropTypes.number,
        nearestStormDistance: PropTypes.number,
        ozone: PropTypes.number,
        precipIntensity: PropTypes.number,
        precipProbability: PropTypes.number,
        precipType: PropTypes.string,
        pressure: PropTypes.number,
        summary: PropTypes.string,
        temperature: PropTypes.number,
        time: PropTypes.number,
        uvIndex: PropTypes.number,
        visibility: PropTypes.number,
        windBearing: PropTypes.number,
        windGust: PropTypes.number,
        windSpeed: PropTypes.number
    })
};

export default DarkSky;