const { model, Schema } = require('mongoose');

const NotificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  sendToAllSuperviseurs: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  seen: {
    type: Boolean,
    default: false
  },
  sendToSupervisorAndEnqueteurs: {
    type: Boolean,
    default: false
  },
  sendToAllUsers: {
    type: Boolean,
    default: false
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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

module.exports = model('Notification', NotificationSchema, 'notifications');