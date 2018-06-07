require('../../models/user');
const express = require('express')
mongoose = require("mongoose"),
    fs = require("fs"),
    User = mongoose.model('User'),
    app = express(),
    router = express.Router();

function writeInDb() {
    User.find({}, function(err, users) {
        if (err) res.send(err);
        var file = JSON.parse(fs.readFileSync(__dirname + '/public/database.json', 'utf-8'))
        file = users;
        fs.writeFileSync(__dirname + '/public/database.json', JSON.stringify(file, null, 2));
    });
}

router.post('/user/add', (req, res) => {
    handlerMethod(req, res);
});

router.post('/user/update', (req, res) => {
    handlerMethod(req, res)
});

router.post('/user/delete', (req, res) => {
    handlerMethod(req, res)
});

function handlerMethod(req, res) {
    console.log(req.body);

    let date = new Date;
    const method = req.body._method,
        id = req.body.id,
        username = req.body.username || "",
        email = req.body.email || "",
        phone = req.body.phone || "",
        pass = req.body.password || "",
        fullname = req.body.fullname || "",
        post = req.body.post || "",
        regDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear(),
        post = admin + " " + frontend + " " + backend + " " + moderator + " " + redactor + " " + visitor;

    if (method === "POST") {
        if (!checkRegExEmail(email)) return res.json({ error: "Incorrect email" });
        if (!checkRegExLogin(username)) return res.json({ error: "Incorrect login" });
        if (pass.length < 8) return res.json({ error: "Incorrect password. Min 8 simbols." });

        const new_user = new User({
            username: username,
            email: email,
            post: post,
            phone: phone,
            password: pass,
            fullname: fullname,
            rating: 0,
            regDate: regDate
        });

        new_user.save(function(err, user) {
            if (err) return res.json({ error: "Duplicate username or email" });
            writeInDb();
            res.json({ success: "Success add user" });
        });
    } else if (method === "PUT") {
        console.log("body", req.body);
        if (!checkRegExEmail(email)) return res.json({ error: "Incorrect email" });
        if (!checkRegExLogin(username)) return res.json({ error: "Incorrect login" });
        if (pass.length < 8) return res.json({ error: "Incorrect password. Min 8 simbols." });

        User.findOneAndUpdate({ _id: id }, {
                username: username,
                email: email,
                post: post,
                phone: phone,
                password: pass,
                fullname: fullname
            }, { new: true },
            function(err, user) {
                if (err) res.send(err);
                writeInDb();
                res.json({ success: "Success update user" });
            });
    } else if (method === "DELETE") {
        console.log(req.body.id);

        let id = req.body.id;
        User.remove({ _id: id }, function(err, user) {
            if (err) res.send(err);
            writeInDb();
            res.json({ success: "Success delete user" });
        });
    }
}

// CUSTOM FUNCTIONS
function checkRegExLogin(login) {
    return /^[a-zA-Z1-9]+$/.test(login) && login.length > 3 && login.length < 15;
}

function checkRegExEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
//

module.exports = router;