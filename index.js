var express = require('express')
var tess = require('./tess-receipt');
var fs = require('fs');
var app = express();
var sampleBase64Image = require('./images/sample-b64-image');



app.get('/', function(req, res) {

  fs.writeFile('images/tmp.jpg', new Buffer(sampleBase64Image, 'base64'), err => {
    // console.log('done');
    tess('images/tmp.jpg').then(result => {
      res.send(JSON.stringify(result))
    })
  })
});

var server = app.listen(3000)


