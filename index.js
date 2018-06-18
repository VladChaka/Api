let express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    favicon = require("serve-favicon"),
    getParam = require("./Util/common"),
    port = getParam("port", 4000);

mongoose.connect("mongodb://myadmin:mysecret@127.0.0.1:27017/admin", function(err) {
    if (err) {
        return console.log("Connection error: ", err.message);
	}
    app.listen(port, () => {
        console.log(`Start server on ${port} port`);
    })
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/node_modules/public_chameleon47'));
app.use(favicon(__dirname + '/node_modules/public_chameleon47/favicon/favicon.ico'))


//route
app.use('/', require(__dirname + '/controller/index'));

app.use(function(req, res) {
    res.status(404);
    console.log('Not found URL: %s', req.url);
    res.send({ error: 'Not found' });
    return;
});
app.use(function(err, req, res) {
    res.status(err.status || 500);
    console.log('Internal error(%d): %s', res.statusCode, err.message);
    res.send({ error: err.message });
    return;
});