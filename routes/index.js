const express = require('express');
const router = express.Router();
const connection = require('./database');

router.get('/', (req, res) => {
    var user = req.session.user
    res.render('index', {user: user});
})

module.exports = router