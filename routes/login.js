const express = require('express');
const router = express.Router();
const connection = require('./database');

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/:type', (req, res) => {
    console.log(req.params.type);
    if(req.params.type === 'login'){
        
    }else if(req.params.type === 'signup'){
        console.log('aaa');

        var sql = 'INSERT INTO user ( user_id, user_pw, user_name, user_email ) VALUES (?, ?, ?, ?) ';
        var data = [req.body.user_id , req.body.user_pw, req.body.user_name, req.body.user_email ];
        connection.query(sql, data, (error, results, fields) => {
            if(error){
                throw error;
            }
            let member_index = results.insertId;
            console.log(member_index);
        })
    }
})


module.exports = router