const usersRouter = require('express').Router()

const { auth} = require('../utils/function')
const { seeYourUser } = require('../controllers/users.controller')


usersRouter.get('/me', auth, seeYourUser)


module.exports = usersRouter