const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const {secretKey} = require('../config/default.json')

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, secretKey, {expiresIn: '1h'})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if(candidate){
                return res.status(400).json({message: `User with email: ${email} is exist`})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const user = new User({email, password: hashPassword, role: 'User'})
            await user.save()
            res.status(200).json({message: 'User was created succesfuly'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }
    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})

            if (!user) {
                return res.status(400).json({message: `User with ${email} is not found`})
            }

            const validPassword = bcrypt.compareSync(password, user.password)

            if (!validPassword) {
                return res.status(400).json({message: `Incorrect password`})
            }

            req.session.user = user
            req.session.isAuthenticated = true
            req.session.save(err => {
                if (err) {
                    throw err
                }
            })

            const token = generateAccessToken(user._id)
            return res.json({token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

module.exports = new authController()