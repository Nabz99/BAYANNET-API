const { model, Schema } = require('mongoose')
const CommuneSchema = new Schema({

  code: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }, 
  wcode: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }

});

module.exports = CommuneModel = model('Commune', CommuneSchema, 'communes');
