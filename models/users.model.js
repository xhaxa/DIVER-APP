const mongoose = require('mongoose')

const divelogSchema = new mongoose.Schema({
  date: {
    type: String,
    
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