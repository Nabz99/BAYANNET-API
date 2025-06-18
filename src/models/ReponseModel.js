const { Schema, model } = require("mongoose");

const ReponseSchema = new Schema({
  formulaire: {
    type: Schema.Types.ObjectId,
    ref: "Formulaire",
    required: true
  },
  enqueteur: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  superviseur: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  reponses: [
    {
      questionSection: String,
      questionType: String,
      questionTitre: String,   // Store the question's title at the time of response
      valeur: Schema.Types.Mixed // Can be String, Number, Array depending on question type
    }
  ],
  longitude: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
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
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = model("Reponse", ReponseSchema, "reponses");
