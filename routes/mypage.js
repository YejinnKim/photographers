const express = require('express')
const router = express.Router()
const conn = require('./database')

router.get('/', (req, res) => {
    var user = req.session.user
    var sql = 'SELECT * FROM user'
    conn.query(sql, (err, result) => {
        res.render('mypage', {data: result, user: user})
    })
})

module.exports = router