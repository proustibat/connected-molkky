import { DARKSKY_SECRET } from '@root/config';
import fetch from 'node-fetch';

const getWeather = async () => {
  const config = {
    secret: DARKSKY_SECRET,
    location: '48.8534,2.3488',
    lang: 'fr',
    units: 'auto',
    exclude: 'minutely,hourly,daily,alerts,flags',
  };
  const weatherAPI = `https://api.darksky.net/forecast/${config.secret}/${config.location}?lang=${config.lang}&units=${config.units}&exclude=${config.exclude}`;
  const response = await fetch(weatherAPI).catch((err) => throw (err));
  return response.json();
};
export default getWeather;
