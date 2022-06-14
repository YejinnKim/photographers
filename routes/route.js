// express 모듈 추가, 라우터 사용
const express = require('express')
const router = express.Router()

// 라우팅 파일 가져오기
const index = require('./index')
const BestPhotographers = require('./BestPhotographers')
const photos = require('./photos')
const mypage = require('./mypage')
const login = require('./login')

// 라우팅
router.use('/', index)
router.use('/BestPhotographers', BestPhotographers)
router.use('/photos', photos)
router.use('/mypage', mypage)
router.use('/login', login)

// 로그아웃 시 session 삭제 후 index로 이동
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        req.session
    })
    res.redirect('/')
})

module.exports = router;