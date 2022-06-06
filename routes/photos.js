const express = require('express')
const router = express.Router()
const conn = require('./database')
const multer = require('multer')
const path=require("path");
const { redirect } = require('express/lib/response');
const header = "photos";

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
    var sql = 'SELECT *, (select img_name from images where img_code = contents.img_code limit 1) as thumb_img FROM contents';
    conn.query(sql, (err, result) => {
        res.render('photo_list', { data: result, user: user, url:header })
    })
})

router.get('/category/:type', (req, res) => {
    var user = req.session.user
    var sql = `SELECT *, (select img_name from images where img_code = contents.img_code limit 1) as thumb_img FROM contents WHERE category = '${req.params.type}'`;
    conn.query(sql, (err, result) => {
        res.render('photo_list', { data: result, user: user, url: header })
    })
})

router.get('/content/:idx', async (req, res) => {
    var user = req.session.user
    var idx = req.params.idx
    var sql = 'select * from contents where co_idx = ?';
    var imageSql = 'select * from images where img_code = ?';
    var likeSql = 'select * from likes where user_id = ? and co_idx = ?';
    
    conn.query(sql, idx, (err, result) => {   
        var data = result[0];
    
        conn.query(imageSql, result[0].img_code, (err, results)=>{
            var imageData = results;
            
            if (!user) {
                res.render('photos_details', {
                    data: data,
                    imageData: imageData,
                    user: 0,
                    likeData: 0
                })
            } else {
                conn.query(likeSql, [user.id, idx], (err, results)=>{
                    res.render('photos_details', {
                        data: data,
                        imageData: imageData,
                        user: user,
                        likeData: results
                    })
                })
            }
        })

    })
})

router.get('/write', (req,res) => {
    var user = req.session.user
    if (!user) res.redirect('/login')
    res.render('photo_write', {user: user, url:header});
})

router.post('/write', (req,res) => {
    var data = req.body;
    var sql = ` INSERT INTO contents ( category, img_code, subject, contents, user_id) VALUES ( '${data.category}', '${data.img_code}', '${data.subject}', '${data.contents}', '${req.session.user.id}')`;
    conn.query(sql, (error, results, fields) => {
        if(error){
            res.status(400).send({message : "database error"});
            return;
        }
        let member_index = results.insertId;
        console.log(member_index);
        res.status(200).send({message: "success"});
    })
})

router.post('/write/imageUpload/', upload.array('uploadFile'), (req, res, next) => {
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
        // console.log("폼에 정의된 필드명 : ", data.fieldname);
        // console.log("사용자가 업로드한 파일 명 : ", data.originalname);
        // console.log("파일의 엔코딩 타입 : ", data.encoding);
        // console.log("파일의 Mime 타입 : ", data.mimetype);
        // console.log("파일이 저장된 폴더 : ", data.destination);
        // console.log("destinatin에 저장된 파일 명 : ", data.filename);
        // console.log("업로드된 파일의 전체 경로 ", data.path);
        // console.log("파일의 바이트(byte 사이즈)", data.size);
    })
    res.status(201).send({
        message: "success",
        fileInfo: req.files
    })
})

router.delete('/:idx', async (req, res) => {
    var idx = req.params.idx
    var sql = 'DELETE FROM contents WHERE co_idx = ?';
    conn.query(sql, idx, (err, result) => {   
        res.redirect()
    })
})


router.post('/like', (req, res) => {
    var data = req.body;
    if (!req.session.user) res.redirect('/login')

    var sql = ` INSERT INTO likes ( co_idx, type, user_id ) VALUES ( ${data.co_idx}, '${data.type}', '${req.session.user.id}')`;
    conn.query(sql, (error, results, fields) => {
        if(error){
            console.log(sql);
            res.status(400).send({message : "database error"});
            return;
        }

        var sql2 = ` UPDATE contents SET ${data.type} = ${data.type}+1 WHERE co_idx = ${data.co_idx}`;
        conn.query(sql2, (error, results, fields) => {
            if(error){
                console.log(sql2);
                res.status(400).send({message : "database error"});
                return;
            }
        });
        res.status(200).send({message: "success"});
    })
})

router.post('/likeCancel', (req, res) => {
    var data = req.body;
    if (!req.session.user) res.redirect('/login')

    var sql = ` DELETE FROM likes WHERE co_idx = ${data.co_idx} AND type =  '${data.type}' AND user_id = '${req.session.user.id}' `;
    conn.query(sql, (error, results, fields) => {
        if(error){
            console.log(sql);
            res.status(400).send({message : "database error"});
            return;
        }
        var sql2 = ` UPDATE contents SET ${data.type} = ${data.type}-1 WHERE co_idx = ${data.co_idx}`;
        conn.query(sql2, (error, results, fields) => {
            if(error){
                console.log(sql2);
                res.status(400).send({message : "database error"});
                return;
            }
        });
        res.status(200).send({message: "success"});
    })
})


module.exports = router