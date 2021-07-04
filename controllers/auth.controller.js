const usersModel = require('../models/users.model')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')



function signUp (req, res) {
  const hashed_pwd = bcrypt.hashSync(req.body.pwd, 10)
  
  const hashed_body = {
    name: req.body.name,
    email: req.body.email,
    pwd: hashed_pwd,
    admin: req.body.admin
  }

  usersModel.create(hashed_body)
    .then((user) => {

      const insideToken = {
        name: user.name,
        id: user._id,
        email: user.email,
        admin: user.admin
      }

      const token = jwt.sign(
        insideToken,
        process.env.SECRET
      )

      const resUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        token: token
      }
      res.json(resUser)

    })
    .catch((err) => {
      res.json(err)
    })
}

function login (req, res) {

  usersModel.findOne({email: req.body.email})
    .then((user) => {
      if (!user) res.json('Can not find the email')

      bcrypt.compare(
        req.body.pwd,
        user.pwd,
        (err) => {
          if(err) res.json('Invalid Password')

          const insideToken = {
            name: user.name,
            email: user.email,
            id: user._id,
            admin: user.admin
          }

          const token = jwt.sign(
            insideToken,
            process.env.SECRET,
          )

          resUser = {
            name: user.name,
            email: user.email,
            id: user._id,
            token: token
          }
          
          res.json(resUser)
        })

    })
    .catch((err) => console.error(err))
}

module.exports = {
  signUp,
  login
}