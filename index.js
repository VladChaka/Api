let getParam = require("./Util/common"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    express = require("express"),
    rout = require("./modules/users"),
    port = getParam("port", 4000),
    app = express();
    let user = require("./modules/users/index"),
    database;

mongoose.connect("mongodb://admin:vlad12345@ds245170.mlab.com:45170/mydb", function (err, db) {
    if (err) console.log("Error");

    database = db;
    console.log("Success db connection");
});

app.get("/", function (req, res) {

    database.collection("users").find({}).toArray(function(err, user){
        if (err) console.log("Error");
        res.render("index.hbs", {
            user
        });
        
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false } ));

app.use(express.static(__dirname + '/public'));

// ROUTING
app.use('/', require('./modules/users/index'));
// END ROUTING

app.listen(port, () => {
    console.log(`Start server on ${port} port`);
})