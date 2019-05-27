const fs = require('fs');
const express = require('express');
const router = express.Router();
const map = require('../services/map')
const twitterService = require('../services/twitter');
const senders = require('../config/senders');


router.get('/mapDraw', (req, res) => {
    twitterService.uploadPost(senders.general, 'סטאטוס יומי', fs.readFileSync(map.draw()));
    res.json({status: 'ok'});
});

module.exports = router;
