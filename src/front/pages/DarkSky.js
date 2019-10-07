import React from 'react';
import kebabCase from 'lodash/kebabCase';

const DarkSky = ({title, timezone, latitude, longitude, currently}) => (
    <>
        <h1>{ title }</h1>
        <h2>{timezone} {latitude} {longitude}</h2>
        <ul className="collection">
            {
                Object.entries(currently).map(info =>
                    <li key={kebabCase(info[0])} className="collection-item">{info[0]}: {info[1]}</li>
                )
            }
        </ul>
    </>
);
export default DarkSky;