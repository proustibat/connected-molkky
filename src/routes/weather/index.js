import express from 'express';
import getWeather from '../../services/getWeather';

const router = express.Router();

router.get('/', async (req, res) => {
    const weather = await getWeather().catch(err => res.status(500).send(`Something broke! ${err}`));
    weather && res.render('weather', { title: 'Weather', weather });
});

module.exports = router;
