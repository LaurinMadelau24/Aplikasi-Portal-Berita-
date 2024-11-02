// require news controller
const {create, findAll, findOneNews, update, deleteOne, deleteAll, SearchNews} = require('../controller/News')
//require express router
const router = require('express').Router()

//token verification
const {verifyToken, authorizeRole, authorizeAllRole} = require('../middlewares/authJWT')


module.exports = app => {
    router.post('/create',verifyToken, authorizeRole('Admin'), create) // admin
    router.get('/',findAll) // user
    router.get('/:id', findOneNews) // user
    router.put('/update/:id',verifyToken,authorizeRole('Admin'), update) //admin
    router.delete('/delete/:id',verifyToken,authorizeRole('Admin'), deleteOne)//admin
    router.post('/search', SearchNews) // visitors can search

    //only admin
    // router.delete('/news/deleteAll',authorizeRole('Admin'),verifyToken, deleteAll)//admin

    app.use('/api/news', router)
}