const { KafkaConsumer } = require('@confluentinc/kafka-javascript');

const consumer = new KafkaConsumer({
  'bootstrap.servers': process.env.KAFKA_BROKERS,
  'client.id': process.env.KAFKA_CLIENT_ID,
  'group.id': process.env.KAFKA_GROUP_ID,
});

module.exports = consumer;
