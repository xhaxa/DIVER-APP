const mongoose = require('mongoose')


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
  turn: {
    type: String,
    enum: ['lateshift', 'earlyshift']
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "students",
    }
  ],      
  planning: {
    type: Date,
  },
  admin: {
    type: Boolean,
    default: false,
  }
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