const { Producer } = require('@confluentinc/kafka-javascript');

const producer = new Producer({
  'bootstrap.servers': process.env.KAFKA_BOOTSTRAP_SERVERS,
  'client.id': 'checkout-service',
  acks: 'all',
});

producer.on('event.error', (err) => {
  console.error('Kafka error', err);
});

producer.connect();

setInterval(() => {
  producer.poll();
}, 100);

module.exports = producer;
