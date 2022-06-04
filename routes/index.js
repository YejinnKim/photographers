const express = require('express');
const router = express.Router();
const connection = require('./database');

router.get('/', (req, res) => {
    const sql = "SELECT * FROM mainBanner WHERE showYN = 'Y' ";
    
    connection.query(sql, (err, results) => {
        if(err){
            console.log(err);
        }
        
        res.render('index', {data :results});
    })
    
})

module.exports = router