const { Kafka } = require('@confluentinc/kafka-javascript');
const eventsRepo = require('../repository/eventtix.repositories');

const kafka = new Kafka({
  brokers: ['kafka:9092'],
});

const consumer = kafka.consumer({
  groupId: 'event-service',
});

const consumerRun = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'ticket_issued' });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const { eventId, qty } = JSON.parse(message.value.toString());

        const event = await eventsRepo.findById(eventId);
        if (!event) return;

        const newQuota = event.sisa_kuota - qty;
        if (newQuota < 0) {
          console.warn(`Quota not enough for event ${eventId}`);
          return;
        }

        await eventsRepo.update(event.id, {
          sisa_kuota: newQuota,
        });
      } catch (err) {
        console.error('Failed process ticket_issued event', err);
        throw err;
      }
    },
  });
};

consumerRun();
