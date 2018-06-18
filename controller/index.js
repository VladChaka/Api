let express = require('express'),
	router = express.Router(),
	service = require("../servise/index");

router.get('/users', (req, res) => {
    service.findAll(req, res);
});

router.post('/users/add', (req, res) => {
    service.add(req, res);
});

router.get('/users/:userId', (req, res) => {
    service.findOne(req, res);
});

router.post('/users/update/:userId', (req, res) => {
    service.update(req, res);
});

router.delete('/users/delete/:userId', (req, res) => {
    service.delete(req, res);
});

module.exports = router;