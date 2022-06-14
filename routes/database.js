// mysql 모듈 사용
const mysql = require('mysql')

// db 서버와 연결
var connection = mysql.createConnection({
    host: '121.254.153.149',
    user: 'photographers',
    database: 'photographers',
    password: 'photo12!@',
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
