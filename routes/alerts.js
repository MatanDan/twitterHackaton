const express = require('express');
const xml2js = require('xml2js');
const router = express.Router();

router.post('/get', function(req, res) {
  xml2js.parseString(req.body, function(err, data) {
    console.log(data['env:Envelope']['env:Body'][0]['ns3:alert'][0]);
  });
  res.json({status: 'ok'});
});

module.exports = router;