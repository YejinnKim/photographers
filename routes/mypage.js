const express = require('express')
const router = express.Router()
const conn = require('./database')

router.get('/', (req, res) => {
    var user = req.session.user
    var sql = `SELECT * FROM user WHERE user_id = '${user.id}'`
    conn.query(sql, (err, result) => {
        console.log(result)
        res.render('mypage', {data: result[0], user: user})
    })
})

module.exports = router