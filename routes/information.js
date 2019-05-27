const express = require('express');
const router = express.Router();
const map = require('../services/map');

router.get('/mapDraw', (req, res) => {
    console.log(map.draw());
    res.json({status: 'ok'});
});

module.exports = router;