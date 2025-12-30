const mongoose = require('mongoose');

const notifitacionLogSchema = new mongoose.Schema(
  {
    status: String,
    userId: String,
    eventId: String,
    qty: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('notificationLog', notifitacionLogSchema);
