var express = require('express')
var bodyParser = require('body-parser');
var tess = require('./tess-receipt');
var fs = require('fs');
var app = express();
var sampleBase64Image = require('./images/sample-b64-image');
var rawSettings = {
  limit: '10mb'
}

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.post('/', bodyParser.json(rawSettings), function(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  fs.writeFile('images/tmp.jpg', new Buffer(req.body['base64'], 'base64'), () => {
    tess('images/tmp.jpg').then(result => {
      console.log(result);
      res.send(JSON.stringify(result))
    });
  })
});

var server = app.listen(3000)


