let express = require('express'),
	router = express.Router(),
	service = require("../servise/index");

router.get('/favico.io', (req, res) => {
    res.status(404);
    res.json({ error: "Not found" });
});

router.get('/users', (req, res) => {
    service.findAll(req, res);
});

router.post('/user/:id', (req, res) => {
    service.findOne(req, res);
});

router.post('/add', (req, res) => {
    service.add(req, res);
});

router.post('/update/:id', (req, res) => {
    service.update(req, res);
});

router.post('/delete/:id', (req, res) => {
    service.delete(req, res);
});

module.exports = router;