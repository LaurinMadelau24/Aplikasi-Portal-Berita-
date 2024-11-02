//user controller
const {register, login, logout} = require('../controller/Auth')

//express router
const router = require('express').Router();

//verify token
const {verifyToken} = require('../middlewares/authJWT')

module.exports = app => {
    router.post('/register',register)
    router.post('/login',login)
    router.post('/logout', verifyToken,logout)


    app.use('/api/auth', router)
}