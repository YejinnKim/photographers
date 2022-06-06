const express = require('express');
const router = express.Router();
const connection = require('./database');
const header = "home";

router.get('/', (req, res) => {
    var user = req.session.user    
    const sql = "SELECT * FROM mainBanner WHERE showYN = 'Y' ";
    
    connection.query(sql, (err, results) => {
        if(err) console.log(err);
        res.render('index', {data :results, user: user, url:header});
    })
})

module.exports = router