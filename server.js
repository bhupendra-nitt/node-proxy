var express = require('express');  
var request = require('request');
var bodyParser = require('body-parser')

var app = express();  
app.use(bodyParser.raw())

app.use('*', function(req, res) {  
  console.log(req.baseUrl)
  req.headers['host'] = 'HOST_URL_TO_PROXY'
  req.headers["Access-Control-Allow-Origin"] = "*"
  req.headers['Accept-Encoding'] = 'gzip, deflate, br'
  res.header("Access-Control-Allow-Origin", "*");
  var url = 'HOST_URL' + req.baseUrl;
  req.pipe(request(url, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode);
})).pipe(res);
});

app.listen(4400);  