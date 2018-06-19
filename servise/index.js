require('../repository/user');
let mongoose = require("mongoose"),
    User = mongoose.model('User');

module.exports.add = function(req, res) {
    const date = new Date,
          username = req.body.username || "",
          email = req.body.email || "",
          phone = req.body.phone || "",
          pass = req.body.password || "",
          fullname = req.body.fullname || "",
          post = req.body.post || "",
          regDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();

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

    new_user.save(function(err) {
        if (err) {
            let duplicate = checkDublicat(err.message);
            return res.json(duplicate);
        }
        res.json({ success: "User successfully added!" });
    });
}

module.exports.update = function(req, res) {
    const id = req.params.userId,
          email = req.body.email || "",
          phone = req.body.phone || "",
          pass = req.body.password || "",
          fullname = req.body.fullname || "",
          post = req.body.post || "";

    User.findOneAndUpdate({ _id: id }, {
            email: email,
            post: post,
            phone: phone,
            password: pass,
            fullname: fullname
        },
        function(err) {
            if (err) {
                let duplicate = checkDublicat(err.message);
                return res.json(duplicate);
            }
            res.json({ success: "User successfully updated!" });
        });
}

module.exports.delete = function(req, res) {
    let id = req.params.userId;
    User.remove({ _id: id }, function(err) {
		if (err) return console.log("Delete error: ", err.message);
        res.json({ success: "User deleted successfully!" });
    });
}

module.exports.findOne = function(req, res) {
    let id = req.params.userId;
    User.findOne({ _id: id }, function(err, user) {
		if (err) return console.log("Search error: ", err.message);
        res.json(user);
    });
}

module.exports.findAll = function(req, res) {
    User.find({}, function(err, users) {
        if (err) return console.log("Search error: ", err.message);
        res.json(users);
    });
}

function checkDublicat(err) {
	let emailOrUsername = err.split("$")[1].split("_")[0];

    if (emailOrUsername === "username") {
        emailOrUsername = { error: "This login duplicate" };
    } else if (emailOrUsername === "email") {
        emailOrUsername = { error: "This email duplicate" };
    }

    return emailOrUsername;
}