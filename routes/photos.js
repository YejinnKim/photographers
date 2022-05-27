const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('photo_list')
})

module.exports = router