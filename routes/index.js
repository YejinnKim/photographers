const express = require('express')
const router = express.Router()
const connection = require('./database')

router.get('/', (req, res) => {
    const sql = ''
    
    connection.query(sql, (err, result) => {
        res.render('index')
    })
    
})

module.exports = router