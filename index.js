let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    getParam = require("./util/common"),
	port = getParam("port", 4000),
	dbMlab = "mongodb://admin:vlad12345@ds245170.mlab.com:45170/mydb", 
	dbMlabTest = "mongodb://admin:vlad12345@ds121088.mlab.com:21088/unittest",
	db = getParam("local", dbMlabTest);
	
mongoose.connect(db, function(err) {
	if (err) return console.log("Connection error: ", err.message);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(favicon(__dirname + '/public_chameleon47/favicon/favicon.ico'));
app.use(express.static(__dirname));
app.use(express.static(__dirname + '/public_chameleon47'));

//route
app.use('/', require(__dirname + '/controller/index'));

app.use(function(req, res) {
	res.status(404);
    console.log('Not found URL: %s', req.url);
    res.send({ error: 'Not found' });
    return;
});

app.listen(port, () => {
	console.log(`Start server on ${port} port`);
})

module.exports = app;