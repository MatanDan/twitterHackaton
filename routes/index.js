const express = require('express');
const router = express.Router();
const Twitter = require('twitter');

let client = new Twitter({
  consumer_key: 'ZodQQ7OaRigtbhZfW9EPvLD4t',
  consumer_secret: 'i5JESEyO1tBYXugE1liP9C6yzxzDoSqdUZztsMvawubQTxNXiC',
  access_token_key: '714897086525923328-7wwWscieeB3IYvn2v5xy44qkDx64xzH',
  access_token_secret: 'bWwCvpZBzOvGKHdQgeaYPrHcTv4y2L6ab54qgxHH5USmA'
});

router.get('/', function(req, res) {
  let params = {status: 'This is status from Matan\'s API.'};
  client.post('statuses/update', params, function(error, data, response) {
    if (!error) {
      console.log(data);
      res.json(data);
    } else {
      res.json(error);
    }
  });
});

module.exports = router;
