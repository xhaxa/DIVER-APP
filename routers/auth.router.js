const authRouter = require('express').Router()

const {login, signUp} = require('../controllers/auth.controller')

authRouter.post('/login', login)
authRouter.post('/signup', signUp)

module.exports = authRouter