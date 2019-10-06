import express from 'express';
import fetch from 'node-fetch';
import {DARKSKY_SECRET} from '../config';

const router = express.Router();

const getWeather = async () => {
    const config = {
        secret: DARKSKY_SECRET,
        location: "48.8534,2.3488",
        lang: "fr",
        units: "auto",
        exclude: "minutely,hourly,daily,alerts,flags"
    };
    const weatherAPI = `https://api.darksky.net/forecast/${config.secret}/${config.location}?lang=${config.lang}&units=${config.units}&exclude=${config.exclude}`;
    const response = await fetch(weatherAPI);
    return response.json();
};

router.get('/', (req, res) => {
    getWeather()
        .then(weather => {
            res.render('weather', { title: 'Weather', weather });
        });
});

module.exports = router;
