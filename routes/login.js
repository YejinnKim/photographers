const express = require('express');
const { colours } = require('nodemon/lib/config/defaults');
const router = express.Router();
const connection = require('./database');

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/:type', (req, res) => {
    var user = req.body
    console.log(req.params.type);
    if(req.params.type === 'login'){
        var sql = `SELECT * FROM user WHERE user_id = '${user.user_id}' and user_pw = '${user.user_pw}'`
        connection.query(sql, (error, results, fields) => {
            if (error) throw error;
            if(results[0]) {
                req.session.user = {
                    id: user.user_id,
                    pw: user.user_pw
                }
            }
            res.redirect('/')
        })
    }else if(req.params.type === 'signup'){
        var sql = ` INSERT INTO user ( user_id, user_pw, user_name, user_email ) VALUES ( '${user.user_id}', '${user.user_pw}', '${user.user_name}', '${user.user_email}')`;
        connection.query(sql, (error, results, fields) => {
            if(error) throw error;
            let member_index = results.insertId;
            console.log(member_index);
            res.redirect('/login')
        })
    }
})


module.exports = router