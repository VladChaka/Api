let fs = require("fs"),
    getParam = require("./Util/common"),
    mongodb = require("mongodb"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    express = require("express"),
    port = getParam("port", 4002),
    app = express();

mongoose.connect("mongodb://admin:vlad12345@ds245170.mlab.com:45170/mydb");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));

app.use(express.static(__dirname + '/public'));

// ROUTING
app.use('/', require('./modules/users/index'));
// END ROUTING

app.listen(port, () => {
    console.log(`Start server on ${port} port`);
})