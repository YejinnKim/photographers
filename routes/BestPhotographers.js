const express = require('express')
const router = express.Router()
const conn = require('./database')
const header = "bestphotographers";

router.get('/', (req, res) => {
    var user = req.session.user
    var sql = 'SELECT * FROM user LIMIT 4'
    conn.query(sql, (err, result) => {
        res.render('BestPhotographers', {data: result, user: user, url:header})
    })
})

module.exports = router