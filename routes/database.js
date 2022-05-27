const mysql = require('mysql')

var connection = mysql.createConnection({
    host: '',
    user: '',
    database: '',
    password: '',
    port: ''
})

module.exports = connection