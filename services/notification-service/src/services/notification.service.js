const notificationLog = require('../models/notificationLog.model');

const handleTicketIssued = async (payload) => {
  const { userId, eventId, qty, status } = payload;

  const data = {
    userId,
    eventId,
    qty,
    status,
  };

  const result = await notificationLog.create(data);
  console.log('✅ Saved notification log:', result._id);
};

module.exports = { handleTicketIssued };
