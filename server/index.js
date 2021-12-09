const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)

const corsMiddleware = require('./middleware/cors.middleware')
const userMiddleware = require('./middleware/userMiddleware')

const authRouter = require('./routes/auth.router')
const newsRouter = require('./routes/news.router')

const store = new MongoStore({
    collection: 'sessions',
    uri: config.get('dbURL')
})

const app = express()

app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store: store
}))
const PORT = config.get('serverPort')

app.use(corsMiddleware)
app.use(userMiddleware)

app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/news', newsRouter)

const start = async () => {
    try {

        await mongoose.connect(config.get('dbURL'))

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
