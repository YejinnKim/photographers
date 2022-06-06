const express = require('express');
const { colours } = require('nodemon/lib/config/defaults');
const router = express.Router();
const connection = require('./database');
const header = "login";

router.get('/', (req, res) => {
    var user = req.session.user;
    console.log(user);
    //이미 로긴 중일때는 로긴 페이지 접속 불가능
    if(user){
        res.redirect('/');
    }
    res.render('login', {user:null, url:header})
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