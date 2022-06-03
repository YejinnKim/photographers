const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
const router = require('./routes/route')

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/views'))
app.use(router)
app.use(bodyParser.json);
// app.use(bodyParser.urlencoded({extended : true }));

app.listen(port, () => {
    console.log(`start, express server on port ${port}`)
})