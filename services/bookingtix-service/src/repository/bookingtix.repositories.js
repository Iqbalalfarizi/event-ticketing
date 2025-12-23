const { Booking } = require('../models');

const booking = (payload) => Booking.create(payload);

module.exports = { booking };
