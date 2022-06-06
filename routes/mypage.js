const express = require('express')
const router = express.Router()
const conn = require('./database')
const multer = require('multer')
const path=require("path");
const header = "mypage"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./views/img/uploadImages/");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    var user = req.session.user
    var sql = `SELECT * FROM user WHERE user_id = '${user.id}'`
    conn.query(sql, (err, result) => {
        console.log(result)
        res.render('mypage', {data: result[0], user: user, url:header})
    })
})

router.post('/imageUpload', upload.array('uploadFile'), (req, res, next) => {
    // var data  = req.body;
    console.log("body 데이터 : ", req.files);
    if(!req.files)
    {
        res.status(400).send({message : "File was not found"});
        return;
    }

    req.files.map(data => {
        var sql = ` INSERT INTO images ( img_code, img_name, img_oriname) VALUES ( '${req.body.imageCode}', '${data.filename}', '${data.originalname}')`;
        conn.query(sql, (error, results, fields) => {
            if(error){
                res.status(400).send({message : "database error"});
                return;
            }
            let result_index = results.insertId;
            console.log(result_index);
        })

    })
    res.status(201).send({
        message: "success",
        fileInfo: req.files
    })
})

router.put('/mypage', (req, res) => {
    var sql = `UPDATE user SET (user_pw, user_name, user_email, profile_image, user_intro) = ('${req.body.user_pw}', '${req.body.user_name}', '${req.body.user_email}', '${req.body.profile_image}', '${req.body.user_intro}') WHERE user_id = '${req.body.user_id}'`
    conn.query(sql, (err, result) => {
        if(error){
            res.status(400).send({message : "database error"});
            return;
        }
        res.status(200).send({message: "success"});
    })
})

module.exports = router