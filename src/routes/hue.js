const express = require('express');
const router = express.Router();

/* GET hue page. */
router.get('/', (req, res) => {
    res.render('hue', { title: 'Philips Hue Remote Controller' });
});

module.exports = router;
