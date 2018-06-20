require('../repository/user');
let mongoose = require("mongoose"),
    User = mongoose.model('User');

module.exports.login = function(data, collback) {
    User.findOne({ username: data.username }, function(err, user) {
		if (err) return collback({ Error: err.message });
        if (!user || user.password !== data.pass) return collback({ Error: 'Authentication failed. Login or password wrong.' });
		collback({ success: 'Successful Authentication!' });
    });
}

module.exports.add = function(data, collback) {
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
            return collback(duplicate);
        }
        collback({ success: "User successfully added!" });
    });
}

module.exports.update = function(id, data, collback) {
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
                return collback(duplicate);
            }
            collback({ success: "User successfully updated!" });
        });
}

module.exports.delete = function(id, collback) {
    User.findOneAndRemove({ _id: id }, function(err) {
		if (err) return collback({ Delete_error: err.message });
		collback({ success: "User deleted successfully!" });
	});
}

module.exports.findOne = function(id, collback) {
    User.findOne({ _id: id }, function(err, user) {
        if (err) return collback({ Search_error: err.message });
        collback(user);
    });
}

module.exports.findAll = function(collback) {
    User.find({}, function(err, users) {
        if (err) return collback({ Search_error: err.message });
        collback(users);
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