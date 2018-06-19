require('../repository/user');
let mongoose = require("mongoose"),
    User = mongoose.model('User');

module.exports.login = function(res, data) {
    User.findOne({ username: data.username }, function(err, user) {
        if (err) return res.json({ Error: err.message });
        if (!user) {
            res.json({ Error: 'Authentication failed. User not found.' });
        } else if (user) {
            if (user.password !== data.pass) {
                res.json({ Error: 'Authentication failed. Wrong password.' });
            } else {
                res.json({ success: 'Successful Authentication!' });
            }
        }
    });
}

module.exports.add = function(res, data) {
    const new_user = new User({
        username: data.username,
        email: data.email,
        post: data.post,
        phone: data.phone,
        password: data.pass,
        fullname: data.fullname,
        rating: 0,
        regDate: data.regDate
    });

    new_user.save(function(err) {
        if (err) {
            let duplicate = checkDublicat(err.message);
            return res.json(duplicate);
        }
        res.json({ success: "User successfully added!" });
    });
}

module.exports.update = function(res, id, data) {
    User.findOneAndUpdate({ _id: id }, {
            email: data.email,
            post: data.post,
            phone: data.phone,
            password: data.pass,
            fullname: data.fullname,
        },
        function(err) {
            if (err) {
                let duplicate = checkDublicat(err.message);
                return res.json(duplicate);
            }
            res.json({ success: "User successfully updated!" });
        });
}

module.exports.delete = function(res, id) {
    User.remove({ _id: id }, function(err) {
        if (err) return res.json({ Delete_error: err.message });
        res.json({ success: "User deleted successfully!" });
    });
}

module.exports.findOne = function(res, id) {
    User.findOne({ _id: id }, function(err, user) {
        if (err) return res.json({ Search_error: err.message });
        res.json(user);
    });
}

module.exports.findAll = function(res) {
    User.find({}, function(err, users) {
        if (err) return res.json({ Search_error: err.message });
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