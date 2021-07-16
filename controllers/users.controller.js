const usersModel = require('../models/users.model')


function seeYourUser(req, res) {
  const userId = res.locals.id
  usersModel.findById(userId)
    .then((user) => res.json(user))
    .catch((err) => res.json(err))
}

function addDivelog(req, res) {
  const userId = res.locals.id
  const divelog = req.body

  usersModel.findById(userId)
    .then((user) => {
      user.divelog.push(divelog)
      user.save() 
      res.json(user.divelog)
      console.log(user.divelog);
    })
    .catch((err) => {
      res.json(err)
    })
}

function seeOneDivelog(req, res) {
  const userId = res.locals.id

  usersModel.findById(userId)
  .then((user) => { 
    const divelogId = user.divelog.id(req.params.divelogId)
    res.json(divelogId)
    console.log(divelogId)
  })
  .catch((err) => {
    res.json(err)
  })
}

function updateDivelog(req, res) {
  const userId = res.locals.id
  const divelog = req.body
  
  usersModel.findById(userId)
  .then((user) => {
    
    const divelogId = user.divelog.id(req.params.divelogId)
    
    console.log(divelogId.spot);
    res.json(divelogId)
  })
  .catch((err) => {
    res.json(err)
  })
}



function deleteOneDivelog(req, res){
  const userId = res.locals.id

  usersModel.findById(userId)
  .then((user) => {
    
    const divelogId = user.divelog.id(req.params.divelogId)
    divelogId.remove()
    user.save()
    res.json(user.divelog)
    console.log(user.divelog)
  })
  .catch((err) => {
    res.json(err)
  })
}

function deleteUser(req, res){
  const userId = res.locals.id

  usersModel.findByIdAndDelete(userId)
    .then((user) => {
      console.log(user)
      res.json(user)
    })
    .catch((err) => {
      res.json(err)
    })
}


module.exports = {
  addDivelog,
  seeOneDivelog,
  updateDivelog,
  deleteOneDivelog,
  seeYourUser,
  deleteUser
 
}    