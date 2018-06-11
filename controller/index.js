let express = require('express'),
    router = express.Router();

router.get('/favico.io', (req, res) => {
    res.status(404);
    res.json({ error: "Not found" });
});

router.get('/users', (req, res) => {
    checkDuplicate(req, res);
});

router.get('/user/:id', (req, res) => {
    checkDuplicate(req, res);
});

router.post('/user/add', (req, res) => {
    checkDuplicate(req, res);
});

router.put('/user/update/:id', (req, res) => {
    handlerMethod(req, res);
});

router.delete('/user/delete/:id', (req, res) => {
    handlerMethod(req, res)
});

module.exports = router;