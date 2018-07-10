let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    getParam = require("./util/common"),
	port = getParam("port", 4000),
	dbMlab = "mongodb://admin:vlad12345@ds245170.mlab.com:45170/mydb", 
	dbMlabTest = "mongodb://admin:vlad12345@ds163610.mlab.com:63610/unittets",
	db = getParam("local", dbMlab);
	
	
setTimeout(function() {
	mongoose.connect(dbMlabTest, function(err) {
		if (err) return console.log("Connection error: ", err.message);
		app.listen(port, () => {
			console.log(`Data Base connection on ${dbMlabTest}`);
			console.log(`Start server on ${port} port`);
		})
	});
}, 10000);	


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//route
app.use('/', require(__dirname + '/controller/index'));

app.use(function(req, res) {
	res.status(404);
    console.log('Not found URL: %s', req.url);
    res.send({ error: 'Not found' });
    return;
});

module.exports = app;