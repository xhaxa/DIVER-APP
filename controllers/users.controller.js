const usersModel = require('../models/users.model')


function seeYourUser(req, res) {
  const userId = res.locals.id //{ _id : res.locals.id}
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
    
  usersModel.findById(userId)
  .then((user) => {
    
    const divelogId = user.divelog.id(req.params.divelogId)

    
    
    divelogId.date = req.body.date ? req.body.date : divelogId.date
    divelogId.time = req.body.time ? req.body.time : divelogId.time
    divelogId.spot = req.body.spot ? req.body.spot : divelogId.spot
    divelogId.duration = req.body.duration ? req.body.duration : divelogId.duration
    divelogId.depth = req.body.depth ? req.body.depth : divelogId.depth
        
    if (req.body.equipment) {
      divelogId.equipment.wetsuit = req.body.equipment.wetsuit ? req.body.equipment.wetsuit : divelogId.equipment.wetsuit
      divelogId.equipment.kg = req.body.equipment.kg ? req.body.equipment.kg : divelogId.equipment.kg
      divelogId.equipment.thick = req.body.equipment.thick ? req.body.equipment.thick : divelogId.equipment.thick
      divelogId.equipment.other = req.body.equipment.other ? req.body.equipment.other : divelogId.equipment.other
    }
    //bottle NO FUNCIONA
    if (req.body.bottle) {
      divelogId.bottle.initialPressure = req.body.bottle.initialPressure ? req.body.bottle.initialPressure : divelogId.bottle.initialPressure
      divelogId.bottle.finalPressure = req.body.bottle.finalPressure ? req.body.bottle.finalPressure : divelogId.bottle.finalPressure
    }
    
    //weather NO FUNCIONA
    if (req.body.weather){
      divelogId.weather.surfacetemperature = req.body.weather.surfacetemperature ? req.body.weather.surfacetemperature : divelogId.weather.surfacetemperature
      divelogId.weather.waterTemperature = req.body.weather.waterTemperature ? req.body.weather.waterTemperature : divelogId.weather.waterTemperature
      divelogId.weather.clime = req.body.weather.clime ? req.body.weather.clime : divelogId.weather.clime
      divelogId.weather.visibility = req.body.weather.visibility ? req.body.weather.visibility : divelogId.weather.visibility
    }

    // divelogId.save({ suppressWarning: true })
    console.log(divelogId);
    user.save()
    // divelogId.save()
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