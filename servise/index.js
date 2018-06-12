require('../repository/user');
let mongoose = require("mongoose"),
	User = mongoose.model('User');
	
module.exports.add = function (req, res){
	console.log(req.body);
	const date = new Date,
          method = req.body._method,
          id = req.body.id,
          username = req.body.username || "",
          email = req.body.email || "",
          phone = req.body.phone || "",
          pass = req.body.password || "",
          fullname = req.body.fullname || "",
          post = req.body.post || "",
		  regDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
		  
	if (!checkRegExEmail(email)) return res.json({ error: "Incorrect email" });
    if (!checkRegExLogin(username)) return res.json({ error: "Incorrect login" });
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
        if (err) {
            res.status(500);
            return console.log("Error: ", err);
        }
        res.json({ success: "User success added!" });
	});		
}

module.exports.update = function (req, res){
	console.log(req.body);
	User.findOneAndUpdate({ _id: id }, {
		email: email,
		post: post,
		phone: phone,
		password: pass,
		fullname: fullname
	}, 
	/*{ new: true },*/
	function(err, user) {
		if (err) {
			res.status(500);
			return console.log("Error: ", err);
		}
		res.json({ success: "User success update!" });
	});	
}

module.exports.delete = function (req, res){
	console.log(req.body);
	let id = req.body.id;
    User.remove({ _id: id }, function(err, user) {
        if (err) {
            res.status(500);
            return console.log("Error: ", err);
        }
        res.json({ success: "User success delete!" });
    });	
}

module.exports.findOne = function (req, res){
    User.findOne({ _id: req.params.id }, function(err, user) {
        if (err) {
            res.status(500);
            return console.log("Error: ", err);
        }
        res.json(user);
    });	
}

module.exports.findAll = function (req, res){
	User.find({ }, function(err, user) {
        if (err) {
            res.status(500);
            return console.log("Error: ", err);
        }
        res.json(user);
    });	
}

// module.exports = function(req, res) {
//     console.log(req.body);

//     const date = new Date,
//           method = req.body._method,
//           id = req.body.id,
//           username = req.body.username || "",
//           email = req.body.email || "",
//           phone = req.body.phone || "",
//           pass = req.body.password || "",
//           fullname = req.body.fullname || "",
//           post = req.body.post || "",
//           regDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();

//     if (method === "POST") {
//         if (!checkRegExEmail(email)) return res.json({ error: "Incorrect email" });
//         if (!checkRegExLogin(username)) return res.json({ error: "Incorrect login" });
//         const new_user = new User({
//             username: username,
//             email: email,
//             post: post,
//             phone: phone,
//             password: pass,
//             fullname: fullname,
//             rating: 0,
//             regDate: regDate
//         });

//         new_user.save(function(err, user) {
//             if (err) {
//                 res.status(500);
//                 return console.log("Error: ", err);
//             }
//             res.json({ success: "User success added!" });
//         });

//     } else if (method === "PUT") {
//         console.log(req.body);

//         // const id = req.body.id[1],
//         //     email = req.body.email[1] || "",
//         //     phone = req.body.phone[1] || "",
//         //     pass = req.body.password[1] || "",
//         //     fullname = req.body.fullname[1] || "",
//         //     post = req.body.post[1] || "";

//         User.findOneAndUpdate({ _id: id }, {
//             email: email,
//             post: post,
//             phone: phone,
//             password: pass,
//             fullname: fullname
// 		}, 
// 		/*{ new: true },*/
//         function(err, user) {
//             if (err) {
//                 res.status(500);
//                 return console.log("Error: ", err);
//             }
//             res.json({ success: "User success update!" });
//         });
//     } else if (method === "DELETE") {
//         let id = req.body.id;
//         User.remove({ _id: id }, function(err, user) {
//             if (err) {
//                 res.status(500);
//                 return console.log("Error: ", err);
//             }

//             writeInDb();
//             res.json({ success: "Success delete user" });
//         });
//     }
// }

function checkRegExLogin(login) {
    return /^[a-zA-Z1-9]+$/.test(login) && login.length > 3 && login.length < 17;
}

function checkRegExEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}