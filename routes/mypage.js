// express 등 필요한 모듈 추가, 라우터 사용, db 설정 파일 사용, 헤더 설정
const express = require('express')
const multer = require('multer')
const path = require("path");
const router = express.Router()
const conn = require('./database')
const header = "mypage"
var img;
// multer 설정 (사진 업로드 모듈)
const storage = multer.diskStorage({
    // 저장 위치
    destination: function (req, file, cb) {
        cb(null, "./views/img/uploadImages/");
    },
    // 저장 파일명
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});
const upload = multer({ storage: storage });

// Mypage 페이지
router.get('/', (req, res) => {
    // 세션에 저장된 로그인 정보가 없으면 login 페이지로 이동
    var user = req.session.user
    if(!user) res.redirect('/login');
    
    // user 테이블에서 현재 로그인한 user 정보 검색 sql
    var sql = `SELECT * FROM user WHERE user_id = '${user.id}'`
    conn.query(sql, (err, result) => {
        // mypage 렌더링, sql문 결과(data), 세션 정보(user), 헤더(url) 데이터 같이 전송
        res.render('mypage', {data: result[0], user: user, url:header})
    })
})

// Mypage 이미지 업로드 처리
router.post('/imageUpload', upload.array('uploadFile'), (req, res, next) => {
    // req.files : 업로드된 파일 내용(fetch로 받아옴)
    // 에러 처리
    if(!req.files)
    {
        res.status(400).send({message : "File was not found"});
        return;
    }

    req.files.map(data => {
        // images 테이블에 입력된 내용 삽입 sql
        var sql = ` INSERT INTO images ( img_code, img_name, img_oriname) VALUES ( '${req.body.imageCode}', '${data.filename}', '${data.originalname}')`;
        conn.query(sql, (error, results, fields) => {
            // 에러 처리
            if(error){
                res.status(400).send({message : "database error"});
                return;
            }
            img = data.filename;
            let result_index = results.insertId;
            console.log(result_index);
        })

    })
    // 업로드 성공, fetch로 업로드 파일 정보와 status 201 넘겨줌
    res.status(201).send({
        message: "success",
        fileInfo: req.files
    })
})

// Mypage 회원 정보 수정 처리
router.put('/', (req, res) => {
    // user 테이블 form에서 받아온 내용으로 수정 sql
    var sql = `UPDATE user SET user_pw='${req.body.user_pw}', user_name='${req.body.user_name}', user_email='${req.body.user_email}'`
    // 이미지와 소개는 선택사항으로, 값이 있으면 sql 추가
    if (img)
        sql += `, profile_image='${img}'`;
    if (req.body.user_intro)
        sql += `, user_intro='${req.body.user_intro}'`;
    // 현재 로그인 중인 user 정보
    sql += `WHERE user_id = '${req.body.user_id}'`
    
    conn.query(sql, (err, result) => {
        // 에러 처리
        if(err){
            res.status(400).send({message : "database error"});
            return;
        }
        // 수정 성공, fetch로 status 201 넘겨줌
        res.status(200).send({message: "success"});
    })
})

// Mypage 회원 탈퇴 처리
router.delete('/', (req, res) => {
    // user 테이블에서 현재 로그인 중인 user 삭제 sql
    var sql = `DELETE FROM user WHERE user_id = '${req.session.user.id}'`
    conn.query(sql, (err, result) => {
        if (err) throw err
        res.redirect('/')
    })
})

module.exports = router