// express 모듈 추가, 라우터 사용, db 설정 파일 사용, 헤더 설정
const express = require('express');
const router = express.Router();
const connection = require('./database');
const header = "login";

// Login/SignUp 페이지
router.get('/', (req, res) => {
    // 세션 정보 user에 저장
    var user = req.session.user;
    // 이미 로그인 중일때는 로그인 페이지 접속 불가능(user에 정보가 있으면 index로 이동)
    if(user) res.redirect('/');

    // login 페이지 렌더링, user: null(아직 login 전이니까), 헤더(url) 데이터 같이 전송
    res.render('login', {user:null, url:header})
})

// 로그인 및 회원가입 처리
router.post('/:type', (req, res) => {
    // 작성된 form 내용 user에 저장(fetch로 받아옴)
    var user = req.body

    // 로그인
    if(req.params.type === 'login'){
        // user 테이블에서 입력된 정보와 같은 레코드 검색 sql
        var sql = `SELECT * FROM user WHERE user_id = '${user.user_id}' and user_pw = '${user.user_pw}' limit 1`
        // db 연결, sql 입력
        connection.query(sql, (error, results, fields) => {
            // 에러 처리
            if (error) throw error;
            // 로그인 성공, 테이블에 값이 있으면 session에 저장 후 index 페이지로 이동
            if(results[0]) {
                req.session.user = {
                    id: user.user_id,
                    pw: user.user_pw
                }
                res.redirect('/')
            // 로그인 실패
            } else 
                res.status(400).send({message: "존재하지 않는 회원 정보 입니다."});
        })
    // 회원가입
    } else if(req.params.type === 'signup'){
        // user 테이블에 입력된 정보 삽입 sql
        var sql = ` INSERT INTO user ( user_id, user_pw, user_name, user_email ) VALUES ( '${user.user_id}', '${user.user_pw}', '${user.user_name}', '${user.user_email}')`;
        // db 연결, sql 입력
        connection.query(sql, (error, results, fields) => {
            // 에러 처리
            if(error) throw error;
            let member_index = results.insertId;
            // 회원가입 후 login 페이지로 이동
            res.redirect('/login')
        })
    }
})

module.exports = router