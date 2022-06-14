// express 등 필요한 모듈 추가, 라우터 사용, db 설정 파일 사용, 헤더 설정
const express = require('express')
const multer = require('multer')
const path = require("path");
const router = express.Router()
const conn = require('./database')
const header = "photos";
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

// Photos 페이지
router.get('/', (req, res) => {
    // 세션에 저장된 로그인 정보가 없으면 login 페이지로 이동
    var user = req.session.user
    if(!user) res.redirect('/login');
    
    // content 테이블에서 image가 존재하는 레코드 검색 sql
    var sql = 'SELECT *, (select img_name from images where img_code = contents.img_code limit 1) as thumb_img FROM contents';
    // db 연결, sql 입력
    conn.query(sql, (err, result) => {
        // photo_list 렌더링, sql문 결과(data), 세션 정보(user), 헤더(url) 데이터 같이 전송
        res.render('photo_list', { data: result, user: user, url:header })
    })
})

// Photos 페이지 카테고리 선택
router.get('/category/:type', (req, res) => {
    // 세션에 저장된 로그인 정보가 없으면 login 페이지로 이동
    var user = req.session.user
    if(!user) res.redirect('/login');
    
    // content 테이블에서 image가 존재하는 레코드 중 선택한 카테고리와 일치하는 레코드 검색 sql
    var sql = `SELECT *, (select img_name from images where img_code = contents.img_code limit 1) as thumb_img FROM contents WHERE category = '${req.params.type}'`;
    // db 연결, sql 입력
    conn.query(sql, (err, result) => {
        // photo_list 렌더링, sql문 결과(data), 세션 정보(user), 헤더(url) 데이터 같이 전송
        res.render('photo_list', { data: result, user: user, url: header })
    })
    
})

// Photos 페이지 사진 상세보기
router.get('/content/:idx', async (req, res) => {
    // 세션 정보 user에 저장
    var user = req.session.user
    // url 파라미터 idx에 저장
    var idx = req.params.idx
    // 세션에 저장된 로그인 정보가 없으면 login 페이지로 이동
    if(!user) res.redirect('/login');
    
    // content 테이블에서 선택한 idx와 일치하는 레코드 검색 sql
    var sql = 'select * from contents where co_idx = ?';
    // images 테이블에서 해당 img_code 검색 sql
    var imageSql = 'select * from images where img_code = ?';
    // likes 테이블에서 해당 content에 누른 좋아요 검색 sql
    var likeSql = 'select * from likes where user_id = ? and co_idx = ?';
    
    // db 연결, sql 입력
    // 상세 내용 검색
    conn.query(sql, idx, (err, result) => {   
        var data = result[0];
        // 해당 img_code 검색
        conn.query(imageSql, result[0].img_code, (err, results)=>{
            var imageData = results;
            // 좋아요 검색
            conn.query(likeSql, [user.id, idx], (err, results)=>{
                // photos_details 렌더링, sql문 결과(data), 세션 정보(user) 데이터 같이 전송
                res.render('photos_details', {
                    data: data,
                    imageData: imageData,
                    likeData: results,
                    user: user
                })
            })
        })
    })
})

// Photos 글 업로드 페이지
router.get('/write', (req,res) => {
    // 세션에 저장된 로그인 정보가 없으면 login 페이지로 이동
    var user = req.session.user
    if (!user) res.redirect('/login')

    // photo_write 렌더링, 세션 정보(user), 헤더(url) 데이터 같이 전송
    res.render('photo_write', {user: user, url:header});
})

// Photos 글 업로드 처리
router.post('/write', (req,res) => {
    // 작성된 form 내용 data에 저장(fetch로 받아옴)
    var data = req.body;
    // content 테이블에 입력된 내용 삽입 sql
    var sql = ` INSERT INTO contents ( category, img_code, subject, contents, user_id) VALUES ( '${data.category}', '${data.img_code}', '${data.subject}', '${data.contents}', '${req.session.user.id}')`;
    // db 연결, sql 입력
    conn.query(sql, (error, results, fields) => {
        // 에러 처리
        if(error) {
            res.status(400).send({message : "database error"});
            return;
        }
        let member_index = results.insertId;
        console.log(member_index);
        // 업로드 성공, fetch로 status 200 넘겨줌
        res.status(200).send({message: "success"});
    })
})

// Photos 페이지 사진 업로드 처리
router.post('/write/imageUpload/', upload.array('uploadFile'), (req, res, next) => {
    // req.files : 업로드된 파일 내용(fetch로 받아옴)
    // 에러 처리
    if(!req.files) {
        res.status(400).send({message : "File was not found"});
        return;
    }
    req.files.map(data => {
        // images 테이블에 입력된 내용 삽입 sql
        var sql = ` INSERT INTO images ( img_code, img_name, img_oriname) VALUES ( '${req.body.imageCode}', '${data.filename}', '${data.originalname}')`;
        conn.query(sql, (error, results, fields) => {
            // 에러 처리
            if(error) {
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
    // 업로드 성공, fetch로 업로드 파일 정보와 status 201 넘겨줌
    res.status(201).send({
        message: "success",
        fileInfo: req.files
    })
})

// Photos 페이지 글 삭제 처리
router.delete('/', async (req, res) => {
    var idx = req.body.idx
    // content 테이블에서 해당 레코드 삭제 sql
    var sql = 'DELETE FROM contents WHERE co_idx = ?';
    // db 연결, sql 입력
    conn.query(sql, idx, (err, result) => {  
        // 에러 처리
        if(error){
            res.status(400).send({message : "database error"});
            return;
        }
        // 삭제 성공, fetch로 status 200 넘겨줌
        res.status(200).send({message: "success"});
    })
})

// Photos 페이지 좋아요 처리
router.post('/like', (req, res) => {
    var data = req.body;
    // 세션에 저장된 로그인 정보가 없으면 login 페이지로 이동
    if (!req.session.user) res.redirect('/login')

    // likes 테이블에 해당 정보(co_idx, 좋아요 type, user id) 삽입 sql
    var sql = ` INSERT INTO likes ( co_idx, type, user_id ) VALUES ( ${data.co_idx}, '${data.type}', '${req.session.user.id}')`;
    conn.query(sql, (error, results, fields) => {
        if(error){
            res.status(400).send({message : "database error"});
            return;
        }
        // content 테이블에도 해당 정보 추가 sql
        var sql2 = ` UPDATE contents SET ${data.type} = ${data.type}+1 WHERE co_idx = ${data.co_idx}`;
        conn.query(sql2, (error, results, fields) => {
            if(error){
                res.status(400).send({message : "database error"});
                return;
            }
        });
        // 좋아요 성공, fetch로 status 200 넘겨줌
        res.status(200).send({message: "success"});
    })
})

// Photos 페이지 좋아요 삭제 처리
router.post('/likeCancel', (req, res) => {
    var data = req.body;
    // 세션에 저장된 로그인 정보가 없으면 login 페이지로 이동
    if (!req.session.user) res.redirect('/login')

    // likes 테이블 해당 정보  삭제 sql
    var sql = ` DELETE FROM likes WHERE co_idx = ${data.co_idx} AND type =  '${data.type}' AND user_id = '${req.session.user.id}' `;
    conn.query(sql, (error, results, fields) => {
        if(error){
            res.status(400).send({message : "database error"});
            return;
        }
        // content 테이블도 해당 정보 삭제 sql
        var sql2 = ` UPDATE contents SET ${data.type} = ${data.type}-1 WHERE co_idx = ${data.co_idx}`;
        conn.query(sql2, (error, results, fields) => {
            if(error){
                res.status(400).send({message : "database error"});
                return;
            }
        });
        // 좋아요 삭제 성공, fetch로 status 200 넘겨줌
        res.status(200).send({message: "success"});
    })
})

module.exports = router