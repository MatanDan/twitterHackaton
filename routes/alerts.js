const express = require('express');
const xml2js = require('xml2js');
const router = express.Router();
const Twitter = require('twitter');
const TwitterService = require('../services/twitter');
const areaSort = require('../services/area-sort');
const map = require('../services/map');

let client = new Twitter({
  consumer_key: 'ZodQQ7OaRigtbhZfW9EPvLD4t',
  consumer_secret: 'i5JESEyO1tBYXugE1liP9C6yzxzDoSqdUZztsMvawubQTxNXiC',
  access_token_key: '714897086525923328-7wwWscieeB3IYvn2v5xy44qkDx64xzH',
  access_token_secret: 'bWwCvpZBzOvGKHdQgeaYPrHcTv4y2L6ab54qgxHH5USmA'
});

router.post('/get', (req, res) => {
  xml2js.parseString(req.body, (err, data) => {
    let distLayers = data['env:Envelope']['env:Body'][0]['ns3:alert'][0]['ns3:info'][0]['ns3:area'];

    // We only use the first layer so far, which must be CITIES.
    let firstLayer = distLayers[0];
    let firstLayerName = firstLayer['ns3:areaDesc'][0];
    if (firstLayerName === 'CITIES') {
      let areas = firstLayer['ns3:geocode'][1]['ns3:value'][0]; // Comma Separated String
      let polygons = areas.split(',').map((item) => parseInt(item) );

      // Now we have Polygons Ids
      map.map(polygons);
      let regionsArray = areaSort.sort(polygons);
      regionsArray.forEach((region) => {
        if (region.areas.length)
        TwitterService.postAlert(region.client, region.areas);
      });
    }
  });
  res.json({status: 'ok'});
});

module.exports = router;
