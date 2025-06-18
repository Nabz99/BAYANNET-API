const { model, Schema } = require('mongoose')
const RegionSchema = new Schema({

  region : {
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

module.exports = RegionModel = model('Region', RegionSchema, 'regions');
