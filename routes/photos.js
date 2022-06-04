const express = require('express')
const router = express.Router()
const conn = require('./database')
const multer = require('multer')
const upload = multer({
    dest: __dirname+'/uploads/',
})


router.get('/', (req, res) => {
    var sql = 'SELECT * FRMO contents'
    conn.query(sql, (err, result) => {
        res.render('photo_list', {data: result})
    })
})

router.get('/content/:idx', async (req, res) => {
    /*var idx = req.params.idx
    var sql = 'select * from contents where co_idx = ?'
    conn.query(sql, idx, (err, result) => {
        res.render('photos_details', {data: result[0]})
    })*/
    res.render('photos_details')
})


router.get('/write', (req,res) => {
    res.render('photo_write');
})

router.post('/write/imageUpload/', upload.array('uploadFile'), (req, res, next) => {
    var data  = req.body;
    console.log("body 데이터 : ", data);

    //배열 형태이기 때문에 반복문을 통해 파일 정보를 알아낸다.
    req.files.map(data => {
      console.log("폼에 정의된 필드명 : ", data.fieldname);
      console.log("사용자가 업로드한 파일 명 : ", data.originalname);
      console.log("파일의 엔코딩 타입 : ", data.encoding);
      console.log("파일의 Mime 타입 : ", data.mimetype);
      console.log("파일이 저장된 폴더 : ", data.destination);
      console.log("destinatin에 저장된 파일 명 : ", data.filename);
      console.log("업로드된 파일의 전체 경로 ", data.path);
      console.log("파일의 바이트(byte 사이즈)", data.size);
    })
    res.json({ok: true, data: "Multipart Upload Ok"})
})




module.exports = router