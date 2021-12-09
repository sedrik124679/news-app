const Router = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const controller = require("../controllers/authController");
const authMiddleware = require("../middleware/auth.middleware");
const {secretKey} = require("../config/default.json");

const router = Router()

router.post('/registration', [
    check('email', "Email is not be empty").notEmpty(),
    check('password', "Password must be > 4 length and < 10 symbols").isLength({min: 4, max: 10})
], controller.registration)

router.post('/login', controller.login)

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, secretKey, {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                }
            })
        } catch (e) {
            res.send({message: "Server error"})
        }
    })

module.exports = router