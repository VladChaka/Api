var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.list_all_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};




exports.create_a_user = function(req, res) {

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
    var new_user = new User({
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
        regDate: Date.now()
    });

    new_user.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.read_a_user = function(req, res) {
    console.log(req.params.id);

    User.findById(req.params.id, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};


exports.update_a_user = function(req, res) {
    const username = req.body.username || "",
        email = req.body.email || "",
        phone = req.body.phone || "",
        fullname = req.body.fullname || "",
        pass = req.body.password || "",
        frontend = req.body.frontend || "",
        admin = req.body.administrator123 || "",
        moderator = req.body.moderator || "",
        redactor = req.body.redactor || "",
        visitor = req.body.visitor || "",
        backend = req.body.backend || "";

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
        }, { new: true },
        function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
};


exports.delete_a_user = function(req, res) {

    User.remove({ _id: req.params.id }, function(err, user) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};

// CUSTOM FUNCTIONS
function checkRegExLogin(login) {
    return /^[a-zA-Z1-9]+$/.test(login) && login.length > 3 && login.length < 15;
}

function checkRegExEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}
//