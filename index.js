let express = require("express"),
    app = express(),
    getParam = require("./Util/common"),
    port = getParam("port", 4001),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://admin:vlad12345@ds245170.mlab.com:45170/mydb", function (err, db) {
    if (err) console.log("Error");  
    console.log("Success db connection");
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(express.static(__dirname + '/modules/users/public'));

//route
app.use('/', require('./modules/users/index'));

app.listen(port, () => {
    console.log(`Start server on ${port} port`);
})