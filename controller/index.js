let express = require('express'),
    router = express.Router(),
    token__module = require('../token/token'),
	jwt = require('jsonwebtoken'),
	DataServise = require("../servise/DataServise"),
	dataServise = new DataServise();

router.post('/login', (req, res) => {
    const jsonData = {
        username: req.body.username || req.query.username,
        pass: req.body.password || req.query.password
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

router.get('/users', (req, res) => {
    dataServise.findAll(function(result){
		res.status(200).json(result); 
	},
	function (err) {
		err.status = 500;
		res.status(500).json(err);
	});
});

router.post('/users', (req, res) => {
    const date = new Date,
          jsonData = {
            username: req.body.username || req.query.username,
            email: req.body.email || req.query.email,
            phone: req.body.phone || req.query.phone,
            pass: req.body.password || req.query.password,
            fullname: req.body.fullname || req.query.fullname,
            post: req.body.post || req.query.post,
            regDate: date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
		  };

	dataServise.add(jsonData, function(result){
		result.status = 200;
		result.message = "User successfully added!";
		res.status(200).json(result); 
	},
	function (err) {
		err.status = 500;
		res.status(500).json(err);
	});
});

router.get('/users/:id', (req, res) => { //token__module.isValid, 
    const id = req.params.id || req.query.id;
    dataServise.findOne(id, function(result){
		res.status(200).json(result);
	},
	function (err) {
		err.status = 500;
		res.status(500).json(err);
	});
});

router.put('/users/:id', (req, res) => {
    const id = req.params.id,
          jsonData = {
			  username: req.body.username || req.query.username,
        	  email: req.body.email || req.query.email,
              phone: req.body.phone || req.query.phone,
              pass: req.body.password || req.query.password,
              fullname: req.body.fullname || req.query.fullname,
              post: req.body.post || req.query.post
		  };
	  
	dataServise.update(id, jsonData, function(result){
		result.status = 200;
		result.message = "User successfully updated!";
		res.status(200).json(result); 
	},
	function (err) {
		err.status = 500;
		res.status(500).json(err);
	});
});

router.delete('/users/:id', (req, res) => {
	const id = req.params.id;	

	dataServise.delete(id, function(result){
		result.status = 200;
		result.message = "User successfully deleted!";		
		res.status(200).json(result); 
	},
	function (err) {
		err.status = 500;
		res.status(500).json(err);
	});
});

module.exports = router;