require('zone.js');
let express = require('express'),
    dataServise = require("../util/dataCore").dataServise,
    token__module = require('../util/token/token'),
    router = express.Router();

router.post('/login', (req, res) => {	
    const jsonData = {
        username: req.body.username || req.query.username,
        password: req.body.password || req.query.password
    };

    dataServise.login(jsonData, function(result){
        res.status(200).json(result);
    },
    function(err){	
        res.status(400).json(err);
    });
});

router.get('/users', token__module.isValid, (req, res) => {
    dataServise.findAll(function(result){
        res.status(200).json(result); 
    },
    function (err) {
        res.status(500).json(err);
    });
});

router.get('/users/:id', token__module.isValid, (req, res) => {
    const id = req.params.id;	
    dataServise.findOne(id, function(result){
        res.status(200).json(result);
    },
    function (err, status) {
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
        res.status(status).json(err);
    });
});

router.delete('/users/:id', token__module.isValid, (req, res) => {
    const id = req.params.id;		

    dataServise.delete(id, function(){
        res.status(200).json({ message: "Ok" }); 
    },
    function (err, status) {
        res.status(status).json(err);
    });
});

router.post('/users/:id/books', (req, res) => {
    Zone.current.fork({}).run(() => {
        const date = new Date;
        Zone.current.data = {
            user: {
                id: req.params.id
            },
            book: {
                name: req.body.nameBook || "",
                date: date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
            }
        };        
        dataServise.books(
            true,
            (result) => { res.status(200).json(result); },
            (err, status) => { res.status(status).json(err); }
        );
    });
});

router.put('/users/:id/books', (req, res) => {
    Zone.current.fork({}).run(() => {
        const date = new Date;
        Zone.current.data = {
            user: {
                id: req.params.id
            },
            book: {
                name: req.body.nameBook || "",
                date: date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear()
            }
        };        
        dataServise.books(
            false,
            (result) => { res.status(200).json(result); },
            (err, status) => { res.status(status).json(err); }
        );
    });
});

module.exports.router = router;