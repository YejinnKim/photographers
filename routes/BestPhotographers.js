const express = require('express')
const router = express.Router()
const conn = require('./database')

router.get('/', (req, res) => {
    var sql = 'SELECT * FROM user LIMIT 4'
    conn.query(sql, (err, result) => {
        res.render('BestPhotographers', {data: result})
    })
})

module.exports = router