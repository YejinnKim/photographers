const express = require('express')
const router = express.Router()
const path = require('path')

const index = require('./index')
const BestPhotographers = require('./BestPhotographers')
const photos = require('./photos')
const mypage = require('./mypage')
const login = require('./login')

router.use('/', index)
router.use('/BestPhotographers', BestPhotographers)
router.use('/photos', photos)
router.use('/mypage', mypage)
router.use('/login', login)

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        req.session
    })
    res.redirect('/')
})

module.exports = router;