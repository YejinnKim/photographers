// express 모듈 추가, 라우터 사용, db 설정 파일 사용, 헤더 설정
const express = require('express');
const router = express.Router();
const connection = require('./database');
const header = "home";

// Home 페이지
router.get('/', (req, res) => {
    // 세션 정보 user에 저장
    var user = req.session.user    
    // mainBanner 테이블에서 화면에 보여질(showYN = 'Y') 레코드 검색 sql
    const sql = "SELECT * FROM mainBanner WHERE showYN = 'Y' ";
    
    // db 연결, sql 입력
    connection.query(sql, (err, results) => {
        // 에러 처리
        if(err) console.log(err);
        // index 페이지 렌더링, sql문 결과(data), 세션 정보(user), 헤더(url) 데이터 같이 전송
        res.render('index', {data :results, user: user, url:header});
    })
})

module.exports = router