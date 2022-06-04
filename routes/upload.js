const express = require('express');
const router = express.Router();
const connection = require('./database');

router.get('/', (req, res) => {
    //res.render('');
})

router.post('/', (req, res) => {
    var cont = req.body
    var sql = ` INSERT INTO contents ( client, thumb_img, subject, content ) VALUES ( '${cont.client}', '${cont.thumb_img}', '${cont.subject}', '${cont.content}')`;
    
    connection.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }
        //res.render('');
    })
    
})

module.exports = router