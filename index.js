let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    favicon = require("serve-favicon"),
    getParam = require("./util/common"),
	port = getParam("port", 4000),
	dbMlab = "mongodb://admin:vlad12345@ds245170.mlab.com:45170/mydb",
	db = getParam("local", dbMlab);	

mongoose.connect(db, function(err) {
	if (err) return console.log("Connection error: ", err.message);
    app.listen(port, () => {
		console.log(`Data Base connection on ${db}`);
        console.log(`Start server on ${port} port`);
    })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(__dirname + '/public_chameleon47/favicon/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public_chameleon47'));

//route
app.use('/', require(__dirname + '/controller/index'));

app.use(function(req, res, next) {
	res.status(404);
    console.log('Not found URL: %s', req.url);
    res.send({ error: 'Not found' });
    next();
});
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log('Internal error(%d): %s', res.statusCode, err.message);
    res.send({ error: err.message });
    return;
});