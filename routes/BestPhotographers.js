// express 등 필요한 모듈 추가, 라우터 사용, db 설정 파일 사용, 헤더 설정
const express = require('express')
const router = express.Router()
const conn = require('./database')
const header = "bestphotographers";

// Best Photographers 페이지
router.get('/', (req, res) => {
    // 세션에 저장된 로그인 정보가 없으면 login 페이지로 이동
    var user = req.session.user
    if(!user) res.redirect('/login')

    // content 테이블에서 user별 좋아요 합계의 상위 4명 검색 sql
    var sql = 'select us.*, SUM(heart+likes+wow+star) as likeCount from contents ct join user us on ct.user_id = us.user_id group by ct.user_id LIMIT 4;'
    // db 연결, sql 입력
    conn.query(sql, (err, result) => {
        // BestPhotographers 렌더링, sql문 결과(data), 세션 정보(user), 헤더(url) 데이터 같이 전송
        res.render('BestPhotographers', {data: result, user: user, url:header})
    })
})

module.exports = router