const BookingRepo = require('../repository/bookingtix.repositories');
const { getProducer, waitForConnection } = require('../utils/kafka');

const booking = async (payload) => {
  try {
    const { userId, eventId, qty } = payload;

    console.log({
      userId: userId,
      eventId: eventId,
      qty: qty,
    });

    await BookingRepo.booking({
      userId: userId,
      eventId: eventId,
      qty: qty,
      status: 'PAID',
    });

    await waitForConnection();

    const producer = getProducer();

    producer.produce(
      'ticket_issued',
      null,
      Buffer.from(JSON.stringify({ eventId, qty, userId }))
    );
    producer.flush(1000, (err) => {
      if (err) {
        console.error('❌ Kafka flush failed:', err);
      }
    });

    return {
      message: 'Booking success',
    };
  } catch (error) {
    console.log('error :', error.message);
  }
};

module.exports = { booking };
