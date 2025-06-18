const { model, Schema } = require('mongoose');

const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
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

// Indexes for better query performance
MessageSchema.index({ sender: 1, receiver: 1 });
MessageSchema.index({ read: 1 });

// Update the timestamp before saving
MessageSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

module.exports = model('Message', MessageSchema, 'messages');