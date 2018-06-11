let express = require("express"),
    app = express(),
    getParam = require("./Util/common"),
    port = getParam("port", 4001),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.connect("mongodb://admin:vlad12345@ds245170.mlab.com:45170/mydb", function (err) {
    if (err) {
		console.log(err);
	} else {
		console.log("Success db connection");
	}  
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(express.static(__dirname + '/node_modules/public_chameleon47'));

//route
app.use('/', require(__dirname + '/modules/index'));

app.listen(port, () => {
    console.log(`Start server on ${port} port`);
})