const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  try {
    console.log(req.headers.token)
    const insideToken = jwt.verify(req.headers.token, process.env.SECRET)
    res.locals.id = insideToken.id
    res.locals.admin = insideToken.admin
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json({msg: 'Not Authorized'})
  }
}

module.exports = {
  auth
}