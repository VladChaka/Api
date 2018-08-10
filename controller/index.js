let express = require('express'),
    Core = require("../util/dataCore"),
    userDataServise = Core.userDataServise,
    libraryDataService = Core.libraryDataService,
    router = express.Router();

/**
 * Users
 */

router.post('/login', (req, res) => {
    userDataServise.login()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json({ error: err.message }));
});

router.get('/users', (req, res) => {
    userDataServise.findAll()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get('/users/:id', (req, res) => {
    userDataServise.findOne()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(err.status).json({ error: err.message }));
});

router.post('/users', (req, res) => {
    userDataServise.add()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(err.status).json({ error: err.message }));
});

router.put('/users/:id', (req, res) => {
    userDataServise.update()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(err.status).json({ error: err.message }));
});

router.delete('/users/:id', (req, res) => {
    userDataServise.delete()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(err.status).json({ error: err.message }));
});

/**
 * Library
 */

router.post('/users/:id/books', (req, res) => {
    libraryDataService.take()
    .then((result) => res.status(200).json(result))
    .catch((err) => {console.log(err);res.status(err.status).json({ error: err.message })});
});

router.put('/users/:id/books', (req, res) => {
    libraryDataService.return()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(err.status).json({ error: err.message }));
});

module.exports.router = router;
