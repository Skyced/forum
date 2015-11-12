var express = require('express')
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname+'/client'))
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
require('./server/config/mongoose.js')
var routes = require('./server/config/routes.js');
routes(app);
app.listen(8000, function(){
    console.log('on 8000');
})