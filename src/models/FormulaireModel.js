const { model, Schema } = require('mongoose');


const FormulaireSchema = new Schema({
    titre: {
        type: String,
        required: true,
        min: 3
    },
    description: {
        type: String,
        required: false
    },
    location: {
        type: Boolean,
        default: false
    },
    questions: [{
        question: {
            type: Schema.Types.ObjectId,
            ref: 'Question', // Reference to the Question model
        },
        section: { type: String },
        order: { type: String },
        titre: { type: String },
        type: { type: String },
        options: {
            type: [Schema.Types.Mixed], // Utilisé pour 'radio' et 'checkbox'
            default: []
        }
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Formulaire', FormulaireSchema, 'formulaires');
