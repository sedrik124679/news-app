const Router = require('express')
const controller = require('../controllers/newsController')
const authMiddleware = require('../middleware/auth.middleware')

const router = Router()

router.post('/add', controller.addNewPost)

router.get('/getnews', controller.getNews)

router.get('/getsinglenews/:id', controller.getSingleNews)

router.post('/addcomment/:id', authMiddleware, controller.addComment)

router.get('/getcomments/:id', controller.getComments)

module.exports = router