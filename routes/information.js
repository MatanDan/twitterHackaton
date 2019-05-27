const express = require('express');
const router = express.Router();
const map = require('../services/map');
const twitterService = require('../services/twitter');
const senders = require('../config/senders');
const axios = require('axios');
const fs = require('fs');
const tinyurl = require('tinyurl');

router.get('/mapDraw', async (req, res) => {
  tinyurl.shorten(map.draw(), async (res, err) => {
    const writer = fs.createWriteStream('images/map.png');
    const response = await axios({
      url: res,
      method: 'GET',
      responseType: 'stream'
    });
    response.data.pipe(writer);
    writer.on('finish', function () {
      twitterService.uploadPost(senders.general, 'סטאטוס ארצי-יומי:', fs.readFileSync('images/map.png'));
    });
  });
  res.json({status: 'ok'});
});

module.exports = router;
