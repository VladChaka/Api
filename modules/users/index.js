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

// router.get('/', (req, res) => {  
//     //res.sendFile(__dirname + '/index.html');  
    
// });

router.post('/user/add', (req, res) => {  
	handlerMethod(req, res);  
});

router.post('/user/update', (req, res) => {
	handlerMethod(req, res)
});

router.post('/user/delete', (req, res) => {	
    handlerMethod(req, res)
});

function handlerMethod(req ,res) {
	console.log(req.body);
	
	let date = new Date;
	const id = req.body.id,
		  username = req.body.username || "",
		  email = req.body.email || "",
		  phone = req.body.phone || "",
		  pass = req.body.password || "",
		  fullname = req.body.fullname || "",
		  admin = (req.body.administrator === "on") ? "Administrator" : "",
		  frontend = (req.body.frontend === "on") ? "Frontend" : "",
		  backend = (req.body.backend === "on") ? "Backend" : "",
		  moderator = (req.body.moderator === "on") ? "Moderator" : "",
		  redactor = (req.body.redactor === "on") ? "Redactor" : "",
		  visitor = (req.body.visitor === "on") ? "Visitor" : "",
		  regDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear(),
		  post = admin + " " + frontend + " " + backend + " " + moderator + " " + redactor + " " + visitor;

			console.log("username",email);
	if (!checkRegExEmail(email)) return res.json({ error: "Incorrect email" });
	if (!checkRegExLogin(username)) return res.json({ error: "Incorrect login" });
	if (pass.length < 8) return res.json({ error: "Incorrect password. Min 8 simbols." });

	if (req.body._method === "POST") {	
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
	} else if (req.body._method === "PUT" || req.body._method[0] === "PUT") {
		console.log(req.body);
		
		// id = req.body.id;
		// username = req.body.username || "";
		// email = req.body.email || "";
		// phone = req.body.phone || "";
		// pass = req.body.password || "";
		// fullname = req.body.fullname || "";
		// admin = (req.body.administrator === "") ? "Administrator" : "";
		// frontend = (req.body.frontend === "") ? "Frintend" : "";
		// backend = (req.body.backend === "") ? "Backend" : "";
		// moderator = (req.body.moderator === "") ? "Moderator" : "";
		// redactor = (req.body.redactor === "") ? "Redactor" : "";
		// visitor = (req.body.visitor === "") ? "Visitor" : "";
		// post = admin + " " + frontend + " " + backend + " " + moderator + " " + redactor + " " + visitor;	

		User.findOneAndUpdate({ _id: id }, {
			username: username,
			email: email,
			post: post,
			phone: phone,
			password: pass,
			fullname: fullname
		}, 
		{ new: true },
		function(err, user) {
			if (err) res.send(err);
			writeInDb();
			res.json({ success: "Success update user" });
		});
	} else if (req.body._method === "DELETE") {
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
function checkRegExEmail(email)
{
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
//

module.exports = router;