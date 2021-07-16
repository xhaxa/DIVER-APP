const usersRouter = require('express').Router()

const { auth} = require('../utils/function')
const { seeYourUser, deleteUser, addDivelog, seeOneDivelog, deleteOneDivelog, updateDivelog } = require('../controllers/users.controller')


usersRouter.get('/me', auth, seeYourUser)
usersRouter.delete('/me', auth, deleteUser)
usersRouter.post('/me/divelog', auth, addDivelog)
usersRouter.get('/me/divelog/:divelogId', auth, seeOneDivelog)
usersRouter.put('/me/divelog/:divelogId', auth, updateDivelog)
usersRouter.delete('/me/divelog/:divelogId', auth, deleteOneDivelog)



module.exports = usersRouter