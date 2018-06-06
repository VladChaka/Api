let getParam = require("./Util/common"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    express = require("express"),
    rout = require("./api/models/model"),
    port = getParam("port", 4000),
    app = express(),
    database;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://admin:vlad12345@ds245170.mlab.com:45170/mydb", function(err, db) {
    if (err) console.log("Error");
    database = db;
    console.log("Success db connection");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));

var routes = require('./api/routes/route'); //importing route
routes(app); //register the route

app.listen(port, () => {
    console.log(`Start server on ${port} port`);
})