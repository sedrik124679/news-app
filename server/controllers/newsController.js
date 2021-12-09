const News = require('../models/News')
const User = require('../models/User')

class NewsController {
    async addNewPost(req, res) {
        try {
            const {title, description, urlIMG, date} = req.body

            const news = new News({title, description, urlIMG, date})

            await news.save()
            return res.json({message: 'News was created'})
        } catch (e) {
            console.log(e)
            res.send({message: 'Inputs can`t be empty'})
        }
    }

    async getNews(req, res) {
        const news = await News.find()
        res.json(news)
    }

    async getSingleNews(req, res) {
        const id = req.params.id
        const news = await News.findById({_id: id})
        res.json(news)
    }

    async addComment(req, res) {
        try {
            const id = req.params.id
            const {comment} = req.body
            const user = await User.find({_id: req.user.id})
            const news = await News.find({_id: id})
            await news[0].addToComments(user[0]._id, comment)

            res.status(200).json({message: 'Comment was sended'})
        } catch (e) {
            console.log(e)
        }
    }

    async getComments(req, res) {
        try {
            const id = req.params.id
            const news = await News.findOne({_id: id})
            const comments = news.comments
            let users = []
            for(let i = 0; i < comments.length; i++) {
                const user = await User.findOne({_id: comments[i].userId})
                users.push({userName: user.email, comment: comments[i].comment, id: comments[i]._id, date: comments[i].commentDate})
            }
            res.json(users)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new NewsController()