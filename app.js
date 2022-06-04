const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
//const session = require('express-session');
const router = require('./routes/route');

const multer = require('multer')
const upload = multer({
    dest: __dirname+'/uploads/',
})

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/views'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true }));

app.use(router)

app.listen(port, () => {
    console.log(`start, express server on port ${port}`)
})