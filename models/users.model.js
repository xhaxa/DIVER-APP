const mongoose = require('mongoose')

const equipmentSchema = new mongoose.Schema ({
  wetsuit: {
    type: String,
    enum: ['Bañador', 'Corto', 'Húmedo', 'Semiseco', 'Seco'],
    default: 'No-wetsuit'
  },
  kg: {
    type: Number
  },
  thick: {
    type: Number
  },
  other: {
    type: String
  }
})

const bottleSchema = new mongoose.Schema ({
  initialPressure: {
    type: Number
  },
  finalPressure: {
    type: Number
  }
})

const weatherSchema = new mongoose.Schema ({
  surfaceTemperature: {
    type: Number
  },
  waterTemperature: {
    type: Number
  },
  clime: {
    type: String,
    enum: ['Soleado', 'Nublado', 'Lluvioso', 'Noche']
  },
  visibility: {
    type: String,
    enum: ['< 5 metros', '10 metros', '> 15 metros']
  }
})

const divelogSchema = new mongoose.Schema({
  date: {
    type: String
  },
  time: { 
    type: String, 
    required: [true, 'The time cannot be blank.'],
  },
  spot: {
    type: String,
    required: [true, 'The spot cannot be blank.'],
  },
  duration: { 
    type: Number, 
    required: [true, 'The duration cannot be blank.'],
  },
  depth: { 
    type: Number, 
    required: [true, 'The depth cannot be blank.'],
  },
  equipment: equipmentSchema,
  bottle: bottleSchema,
  weather: weatherSchema
})



const divelogModel = mongoose.model('divelog', divelogSchema)




const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Your username cannot be blank.'], 
  },
  email: { 
    type: String, 
    lowercase: true,
    unique: true
  }, 
  pwd: {
    type: String
  },
  divelog: [divelogSchema]
})

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel

//email: { type: String, set: toLower }
//new Schema({ email: { type: String, lowercase: true }})

//Con esta expresión regular puedes validar cualquier dirección de correo elecrónico que contenga caracteres Unicode:


//enum: {
 /* values: ['lateshift', 'earlyshift'],
  message: '{VALUE} is not supported'
*/
/*   
/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()    
  
*/