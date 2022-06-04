const express = require('express')
const router = express.Router()
const conn = require('./database')

router.get('/', async (req, res) => {
    var query = req.query.category
    var sql = 'SELECT * FROM contents'
    
    conn.query(sql, (err, result) => {
        res.render('photo_list', {data: result})
    })
})

router.get('/:idx', async (req, res) => {
    /*var idx = req.params.idx
    var sql = 'select * from contents where co_idx = ?'
    conn.query(sql, idx, (err, result) => {
        res.render('photos_details', {data: result[0]})
    })*/
    res.render('photos_details')
})

module.exports = router