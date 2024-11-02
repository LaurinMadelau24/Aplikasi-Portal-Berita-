// require news controller
const {create, findAll, findOneCategory, update, deleteOne} = require('../controller/Category')
//require express router
const router = require('express').Router()



//token verification
const {verifyToken, authorizeRole, authorizeAllRole} = require('../middlewares/authJWT')


module.exports = app => {
    router.post('/create',verifyToken,authorizeRole('Admin'), create) //admin
    router.get('/', findAll) //user
    router.get('/:id', findOneCategory)//user
    router.put('/update/:id',verifyToken, authorizeRole('Admin') , update) //admin
    router.delete('/delete/:id',verifyToken,authorizeRole('Admin') , deleteOne) //admin



    app.use('/api/category', router)
}