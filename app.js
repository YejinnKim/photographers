// express 및 필요한 모듈 추가
const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer')
// 필요한 변수 선언
const app = express()
const port = 3000
const router = require('./routes/route');
const upload = multer({
    dest: __dirname+'/uploads/',
})

// ejs 엔진 설정
app.set('view engine', 'ejs')
// 렌더링 폴더 위치 설정
app.set('views', __dirname + '/views')
// 정적 파일 설정
app.use(express.static(__dirname + '/views'))
app.use(bodyParser.json());
app.use(express.urlencoded({extended : true }));
// session 설정
app.use(session({
    secret: '123',
    resave: true,
    saveUninitialized: true
}))

// 라우터
app.use(router)

// 서버 실행
app.listen(port, () => {
    console.log(`start, express server on port ${port}`)
})