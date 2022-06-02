const express = require('express');
const router = express.Router();
const connection = require('./database');

router.get('/', (req, res) => {
    const sql = 'SELECT * FROM users';
    
    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }
        res.render('index.ejs', {users:results});
    })
    
})

module.exports = router