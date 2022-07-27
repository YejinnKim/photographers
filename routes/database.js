// mysql 모듈 사용
const mysql = require('mysql')

// db 서버와 연결
var connection = mysql.createConnection({
    host: '********',
    user: '********',
    database: 'photographers',
    password: '********',
    port: '3306'
})

// 에러 처리
connection.connect((err)=>{
    if(err){
        console.log('CONNECT ERROT : ' + err.stack);
        return;
    }
    console.log('CONNECT AS ID : ' + connection.threadId);
});

module.exports = connection;
