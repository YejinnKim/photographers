const express = require('express')
const router = express.Router()
const conn = require('./database')
const header = "bestphotographers";

router.get('/', (req, res) => {
    var user = req.session.user
    //회원이 아닐경우 로그인 페이지로 이동
    if(!user) res.redirect('/login');
    var sql = 'SELECT * FROM user LIMIT 4'
    conn.query(sql, (err, result) => {
        res.render('BestPhotographers', {data: result, user: user, url:header})
    })
})

module.exports = router