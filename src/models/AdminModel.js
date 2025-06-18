const {model, Schema} = require('mongoose')

const AdminSchema = new Schema({

  nom: {
    type: String,
    required: true,
    min: 2,
    max: 20
  },
  prenom: {
    type: String,
    required: true,
    min: 2,
    max: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: 6
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  tel: {
    type: String,
    required: true,
    min: 10,
    max: 10
  },
  created_at:{
    type: Date,
    default: Date.now
  },
  updated_at:{
    type: Date,
    default: Date.now
  }

});

module.exports = model('Admin', AdminSchema,'admins');