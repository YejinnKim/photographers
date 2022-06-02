const express = require('express');
const router = express.Router();
const connection = require('./database');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM user';
    
    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }
        res.render('index', {users:result});
    })
    
})

module.exports = router