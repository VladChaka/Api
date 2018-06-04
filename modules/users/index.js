const express = require('express'),
      User = require('../../models/user'),
      router = express.Router();

router.post('/register', (req, res) => {

    console.log(req.body);

    const username = req.body.username || "";
    const email = req.body.email ||{ username: 'allankar2010@mail.ru' };
    const phone = req.body.phone || "";
    const pass = req.body.password || "";
    const fullname = req.body.fullname || "";

    if (!checkRegExEmail(email)) return res.json({ error: "Incorrect email" });
    if (!checkRegExLogin(username)) return res.json({ error: "Incorrect login" });

    const user = new User({
          username: username,
          email: email,
          phone: phone,
          password: pass,
          fullname: fullname,
          regDate: Date.now()
    });

    user.save(function(err) {
        if (err) return res.json({ error: "Duplicate username or email" });

        res.json({ success: "ok" });
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