require('../../models/user');
const express = require('express')
      mongoose = require("mongoose"),
      User = mongoose.model('User'),
      app = express(),
      router = express.Router();

router.get('/view', (req, res) => {        
    User.find({}, function(err, user) {
        if (err) res.send(err);
        res.json(user);
    });
});

router.post('/add', (req, res) => {    
    let date = new Date;

    const username = req.body.username || "",
          email = req.body.email || "",
          phone = req.body.phone || "",
          pass = req.body.password || "",
          fullname = req.body.fullname || "",
          admin = (req.body.administrator1 === "on") ? "Administrator" : "",
          frontend = (req.body.frontend === "on") ? "Frintenddeveloper" : "",
          backend = (req.body.backend === "on") ? "Backenddeveloper" : "",
          moderator = (req.body.moderator === "on") ? "Moderator" : "",
          redactor = (req.body.redactor === "on") ? "Redactor" : "",
          visitor = (req.body.visitor === "on") ? "Visitor" : "",
          regDate = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();        

    if (!checkRegExEmail(email)) return res.json({ error: "Incorrect email" });
    if (!checkRegExLogin(username)) return res.json({ error: "Incorrect login" });

    const new_user = new User({
          username: username,
          email: email,
          administrator: admin,
          frintenddeveloper: frontend,
          backenddeveloper: backend,
          moderator: moderator,
          redactor: redactor,
          visitor: visitor, 
          phone: phone,
          password: pass,
          fullname: fullname,
          rating: 0,
          regDate: regDate
    });

    new_user.save(function(err) {
        if (err) return res.json({ error: "Duplicate username or email" });
        res.json();
    });

    console.log(new_user); 
});

router.put('/update', (req, res) => {
    const id = req.body.id,
          username = req.body.editUsername || "",
          email = req.body.editEmail || "",
          phone = req.body.editPhone || "",
          pass = req.body.editPassword || "",
          fullname = req.body.editFullname || "",
          admin = (req.body.editAdministrator1 === "on") ? "Administrator" : "",
          frontend = (req.body.editFrontend === "on") ? "Frintenddeveloper" : "",
          backend = (req.body.editBackend === "on") ? "Backenddeveloper" : "",
          moderator = (req.body.editModerator === "on") ? "Moderator" : "",
          redactor = (req.body.editRedactor === "on") ? "Redactor" : "",
          visitor = (req.body.editVisitor === "on") ? "Visitor" : "";

    if (!checkRegExEmail(email)) return res.json({ error: "Incorrect email" });
    if (!checkRegExLogin(username)) return res.json({ error: "Incorrect login" });

    User.findOneAndUpdate({ _id: req.params.id }, {
        username: username,
        email: email,
        administrator: admin,
        frintenddeveloper: frontend,
        backenddeveloper: backend,
        moderator: moderator,
        redactor: redactor,
        visitor: visitor,
        phone: phone,
        password: pass,
        fullname: fullname
    }, 
    { new: true },
    function(err, user) {
        if (err) res.send(err);
        res.json(user);
    });
});

router.delete('/delete', (req, res) => {
    User.remove({ _id: req.body._id }, function(err, user) {
        if (err) res.send(err);
        res.json({ message: 'Task successfully deleted' });
    }); 
});

// CUSTOM FUNCTIONS
function checkRegExLogin(login)
{
    return /^[a-zA-Z1-9]+$/.test(login) && login.length > 3 && login.length < 15;
}
function checkRegExEmail(email)
{
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
//

module.exports = router;