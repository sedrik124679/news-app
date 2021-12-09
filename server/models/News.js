const {Schema, model} = require('mongoose')

const News = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    urlIMG: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            },
            comment: {
                type: String,
                required: true
            },
            commentDate: {
                type: Date,
                default: Date.now
            }
        }
    ]
})

News.methods.addToComments = function(user, comment) {
    const clonedComments = [...this.comments]
    clonedComments.push({
        userId: user,
        comment: comment
    })

    this.comments = clonedComments
    return this.save()
}

module.exports = model('News', News)