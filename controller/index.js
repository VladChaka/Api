let express = require('express'),
    router = express.Router(),
    service = require("../servise/index");

router.post('/login', (req, res) => {
    const jsonData = {
        username: req.body.username,
        pass: req.body.password
    };
    service.login(res, jsonData);
});

router.get('/users', (req, res) => {
    service.findAll(res);
});

router.post('/users/add', (req, res) => {
    const date = new Date,
        jsonData = {
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            pass: req.body.password,
            fullname: req.body.fullname,
            post: req.body.post,
            regDate: date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
        };
    service.add(res, jsonData);
});

router.get('/users/:userId', (req, res) => {
    const id = req.params.userId;
    service.findOne(res, id);
});

router.post('/users/update/:userId', (req, res) => {
    const id = req.params.userId,
        jsonData = {
            email: req.body.email,
            phone: req.body.phone,
            pass: req.body.password,
            fullname: req.body.fullname,
            post: req.body.post
        };
    service.update(res, id, jsonData);
});

router.delete('/users/delete/:userId', (req, res) => {
    const id = req.params.userId;
    service.delete(res, id);
});

module.exports = router;