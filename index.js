let express = require("express"),
    app = express(),
    getParam = require("./Util/common"),
    port = getParam("port", 4001),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://admin:vlad12345@ds245170.mlab.com:45170/mydb", function (err, db) {
    if (err) console.log("Error");  
    console.log("Success db connection");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(express.static(__dirname + '/public'));

//route
app.use('/', require('./modules/users/index'));

app.listen(port, () => {
    console.log(`Start server on ${port} port`);
})