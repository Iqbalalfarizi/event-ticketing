const { KafkaConsumer } = require('@confluentinc/kafka-javascript');
const eventsRepo = require('../repository/eventtix.repositories');
const { getRedis } = require('../utils/redis');

const consumer = new KafkaConsumer({
  'bootstrap.servers': process.env.KAFKA_BROKERS,
  'group.id': process.env.KAFKA_GROUP_ID,
  'client.id': process.env.KAFKA_CLIENT_ID,
  'auto.offset.reset': 'earliest',
});

let redis;

const consumerRun = async () => {
  console.log('Starting event consumer .........');

  consumer.connect();

  redis = await getRedis();

  consumer.on('ready', () => {
    console.log('✅ Event consumer ready...');

    consumer.subscribe(['ticket_issued']);

    consumer.consume();
  });

  // ⬇️ LISTENER MESSAGE
  consumer.on('data', async (message) => {
    console.log('🚀 EVENT CONSUMER TERPANGGIL');

    try {
      const payload = JSON.parse(message.value.toString());
      console.log('data event consumer:', payload);

      const { eventId, qty } = payload;

      const event = await eventsRepo.findById(eventId);
      if (!event) {
        console.warn(`Event ${eventId} is not found`);
        return;
      }

      const newQuota = event.sisa_kuota - qty;
      if (newQuota < 0) {
        console.warn(`Quota not enough for event ${eventId}`);
        return;
      }
      await redis.del('events:all');
      await eventsRepo.update(event.id, {
        sisa_kuota: newQuota,
      });
    } catch (err) {
      console.error('Failed process ticket_issued event', err);
    }
  });

  consumer.on('event.error', (err) => {
    console.error('❌ Kafka ERROR:', err);
  });
};

module.exports = consumerRun;
