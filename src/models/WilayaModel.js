const { model, Schema } = require('mongoose')
const WilayaSchema = new Schema({

  wcode: {
    type: String,
    required: true
  },
  wilaya: {
    type: String,
    required: true
  }, 
  rcode: {
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

module.exports = WilayaModel = model('Wilaya', WilayaSchema, 'wilayas');
