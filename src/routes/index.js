const express = require("express") 

const admin = require('./admin')
const commune = require('./commune')
const formulaire = require('./formulaire')
const region = require('./region')
const wilaya = require('./wilaya')
const notification = require('./notification')
const message = require('./message')
const user = require('./user')
const question = require('./question')
const reponse = require('./reponse')
const auth = require('./auth')


const router = express.Router()

router.use('/admin', admin)
router.use('/commune', commune)
router.use('/formulaire', formulaire)
router.use('/region', region)
router.use('/wilaya', wilaya)
router.use('/notification', notification)
router.use('/message', message)
router.use('/user', user)
router.use('/question', question)
router.use('/reponse', reponse)
router.use('/auth', auth)



module.exports = router