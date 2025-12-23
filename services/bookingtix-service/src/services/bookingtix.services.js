const BookingRepo = require('../repository/bookingtix.repositories');
const producer = require('../utils/kafka');

const booking = async (payload) => {
  const { userId, eventId, qty } = payload;

  await BookingRepo.booking({
    userId: userId,
    eventId: eventId,
    qty: qty,
    status: 'PAID',
  });

  producer.produce(
    'ticket_issued',
    null,
    Buffer.from(
      JSON.stringify({
        eventId,
        qty,
      })
    )
  );
};

setInterval(() => {
  producer.poll();
}, 100);

module.exports = { booking };
