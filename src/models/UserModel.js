const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, unique: true, sparse: true }, // Unique but allows null for Enquêteur if username is used instead
  password: { type: String, required: true },
  tel: { type: String, required: true },

  role: { 
    type: String, 
    required: true, 
    enum: ['Superviseur', 'Enqueteur']  // Restrict role values
  },
  region: { 
    type: Schema.Types.ObjectId, 
    ref: 'Region', 
  },
  wilaya: { 
    type: Schema.Types.ObjectId, 
    ref: 'Wilaya', 
  },
  commune: { 
    type: Schema.Types.ObjectId, 
    ref: 'Commune', 
  },
  formulaire: { 
    type: Schema.Types.ObjectId, 
    ref: 'Formulaire', 
    required: function () { return this.role === 'Superviseur'; } // Only required for Superviseur
  },

  superviseur: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: function () { return this.role === 'Enqueteur'; } // Only required for Enquêteur
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = model('User', UserSchema, 'users');
