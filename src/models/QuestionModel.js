const { model, Schema, Types } = require('mongoose');

const ConditionalOptionSchema = new Schema({
  label: { type: String, required: true },
  question: { type: Types.ObjectId, ref: 'Question', required: true }
}, { _id: false });

const QuestionSchema = new Schema({
  titre: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'number', 'radio', 'checkbox', 'conditionnelle', 'menuitem', 'upload', 'date']
  },
  obligatoire: {
    type: Boolean,
    default: false
  },
  isCondition: {
    type: Boolean,
    default: false
  },
  options: {
    type: [Schema.Types.Mixed], // allows both strings or objects, validated below
    default: [],
    validate: {
      validator: function (opts) {
        if (this.type === 'conditionnelle') {
          // Expecting array of objects with label + question
          return Array.isArray(opts) && opts.every(opt =>
            typeof opt === 'object' &&
            typeof opt.label === 'string' &&
            Types.ObjectId.isValid(opt.question)
          );
        } else {
          // Expecting array of strings
          return Array.isArray(opts) && opts.every(opt => typeof opt === 'string');
        }
      },
    }
  }
}, { timestamps: true });

module.exports = model('Question', QuestionSchema, 'questions');
