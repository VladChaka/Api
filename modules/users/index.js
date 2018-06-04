const express = require('express'),
      User = require('../../models/user')
      app = express(),
      mongoose = require("mongoose"),
      router = express.Router();
      let db = mongoose.connect;


      app.set("view engine", "hbs"); 


router.post('/', (req, res) => {

    const username = req.body.username || "",
          email = req.body.email || "",
          phone = req.body.phone || "",
          pass = req.body.password || "",
          fullname = req.body.fullname || "",
          admin = req.body.administrator123 || "",
          frontend = req.body.frontend || "",
          backend = req.body.backend || "",
          moderator = req.body.moderator || "",
          redactor = req.body.redactor || "",
          visitor = req.body.visitor || "";

    if (!checkRegExEmail(email)) return res.json({ error: "Incorrect email" });
    if (!checkRegExLogin(username)) return res.json({ error: "Incorrect login" });

    const user = new User({
          username: username,
          email: email,
          post: {
            administrator: admin,
            frintenddeveloper: frontend,
            backenddeveloper: backend,
            moderator: moderator,
            redactor: redactor,
            visitor: visitor   
          },
          phone: phone,
          password: pass,
          fullname: fullname,
          rating: 0,
          regDate: Date.now()
    });

    user.save(function(err) {
        if (err) return res.json({ error: "Duplicate username or email" });
    });

    console.log(user); 
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