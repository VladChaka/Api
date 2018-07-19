let express = require('express'),
	router = express.Router(),
    token__module = require('../token/token'),
	jwt = require('jsonwebtoken'),
	DataServise = require("../servise/DataServise"),
	dataServise = new DataServise();

router.post('/login', (req, res) => {	
    const jsonData = {
        username: req.body.username || req.query.username,
        password: req.body.password || req.query.password
	};

    dataServise.login(jsonData, function(id){
		const token = jwt.sign({ username: jsonData.username }, 'yqawv8nqi5', { expiresIn: '1 h' });

		res.status(200).json({
			id: id,
			token: token,
			status: 200
		});
	},
	function(err){
		err.status = 400;		
		res.status(400).json(err);
	});
});

router.get('/users', token__module.isValid, (req, res) => {
    dataServise.findAll(function(result){
		res.status(200).json(result); 
	},
	function (err) {
		err.status = 500;
		res.status(500).json(err);
	});
});

router.get('/users/:id', token__module.isValid, (req, res) => {
	const id = req.params.id;	
    dataServise.findOne(id, function(result){		
		res.status(200).json(result);
	},
	function (err, status) {
		err.status = status;
		res.status(status).json(err);
	});
});

router.post('/users', token__module.isValid, (req, res) => {
    const date = new Date,
          jsonData = {
            username: req.body.username || "",
            email: req.body.email || "",
            phone: req.body.phone || "",
            password: req.body.password || "",
            fullname: req.body.fullname || "",
            post: req.body.post || "",
            regDate: date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
		  };

	dataServise.add(jsonData, function(result){	
		res.status(200).json(result); 
	},
	function (err, status) {
		err.status = status;
		res.status(status).json(err);
	});
});

router.put('/users/:id', token__module.isValid, (req, res) => {
    const jsonData = {
        	  email: req.body.email || "",
              phone: req.body.phone || "",
              password: req.body.password || "",
              fullname: req.body.fullname || "",
              post: req.body.post || ""
		  };

	if (jsonData.password === "") {
		delete jsonData.password
	}	

	dataServise.update(req.params.id, jsonData, function(result){
		res.status(200).json(result); 
	},
	function (err, status) {
		err.status = status;		
		res.status(status).json(err);
	});
});

router.delete('/users/:id', token__module.isValid, (req, res) => {
	const id = req.params.id;		

	dataServise.delete(id, function(result){
		result.status = 200;
		result.message = "Ok";		
		res.status(200).json(result); 
	},
	function (err, status) {
		err.status = status;
		res.status(status).json(err);
	});
});

module.exports = router;