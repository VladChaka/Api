require('../models/user');
const express = require('express')
	  mongoose = require("mongoose"),
      fs = require("fs"),
      User = mongoose.model('User'),
      app = express(),
	  router = express.Router();

router.get('/favicon.ico', (req, res) => {
	res.json("404. Page not found.");
});
	
router.post('/user/add', (req, res) => {
	checkDuplicate(req, res);
});

router.post('/user/update', (req, res) => {
    handlerMethod(req, res);
});

router.post('/user/delete', (req, res) => {
    handlerMethod(req, res)
});

function handlerMethod(req, res) {
	const date = new Date,
		  method = req.body._method[0],
          id = req.body.id,
          username = req.body.username || "",
          email = req.body.email || "",
          phone = req.body.phone || "",
          pass = req.body.password || "",
          fullname = req.body.fullname || "",
          post = req.body.post || "",
		  regDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();

    if (method === "POST" || method === "P") {		
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
			  if (err) return res.json({ error: "Error" });
			  writeInDb();
			  res.json({ success: "Success add user" });
		  });
        
    } else if (method === "PUT") {	
		console.log(req.body);
			
		const id = req.body.id[1],
			  email = req.body.email[1] || "",
			  phone = req.body.phone[1] || "",
			  pass = req.body.password[1] || "",
			  fullname = req.body.fullname[1] || "",
			  post = req.body.post[1] || "";
		
        User.findOneAndUpdate({ _id: id }, {
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
    } else if (method === "DELETE" || method === "D") {
        let id = req.body.id;
        User.remove({ _id: id }, function(err, user) {
            if (err) res.send(err);
            writeInDb();
            res.json({ success: "Success delete user" });
        });
    }
}

// CUSTOM FUNCTIONS
function checkDuplicate(req, res) {
	User.findOne({ username: req.body.username }, function (err, user){
		if (err) res.json({ error: "Error" });
		if (user === null) {
			User.findOne({ email: req.body.email }, function (err, user){
				if (err) res.json({ error: "Error" });
				if (user === null) {
					handlerMethod(req, res);
				} else {
					res.json({ error: "This email duplicate" });
				}
			});
		} else {
			res.json({ error: "This login duplicate" });
		}
	});
}
function writeInDb() {
    User.find({}, function(err, users) {
        if (err) res.send(err);
        fs.writeFileSync('./node_modules/public/database.json', JSON.stringify(users, null, 2));
    });
}
function checkRegExLogin(login) {
    return /^[a-zA-Z1-9]+$/.test(login) && login.length > 3 && login.length < 17;
}
function checkRegExEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
//

module.exports = router;