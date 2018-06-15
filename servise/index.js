require('../repository/user');
let mongoose = require("mongoose"),
	User = mongoose.model('User');
	
module.exports.add = function (req, res){
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
        res.json({ success: "User success added!" });
	});		
}

module.exports.update = function (req, res){
	const id = req.params.id,
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
	{ new: true },
	function(err) {
		if (err) {
			let duplicate = checkDublicat(err.message);
            return res.json(duplicate);
		}
		res.json({ success: "User success update!" });
	});	
}

module.exports.delete = function (req, res){
	let id = req.params.id;
    User.remove({ _id: id }, function(err) {
        if (err) {
            res.status(500);
            return console.log("Error: ", err);
        }
        res.json({ success: "User success delete!" });
    });	
}

module.exports.findOne = function (req, res){
	let id = req.params.id;
    User.findOne({ _id: id }, function(err, user) {
        if (err) {
            res.status(500);
            return console.log("Error: ", err);
        }
        res.json(user);
    });	
}

module.exports.findAll = function (req, res){
	User.find({ }, function(err, users) {
        if (err) {
            res.status(500);
            return console.log("Error: ", err);
		}
        res.json(users);
    });	
}

function checkDublicat(err) {
	let emailOrUsername = err.split("index:")[1].split("1")[0].split(" ")[1].split("_")[0];

	if (emailOrUsername === "username") {
		emailOrUsername = { error: "This login duplicate" };
	} else if (emailOrUsername === "email") {
		emailOrUsername = { error: "This email duplicate" };	
	}

	return emailOrUsername;
}