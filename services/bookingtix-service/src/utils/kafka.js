const { Producer } = require('@confluentinc/kafka-javascript');

console.log('KAFKA_BOOTSTRAP_SERVERS:', process.env.KAFKA_BOOTSTRAP_SERVERS);

let producer;
let isConnected = false;
let connectionPromise = null;

/**
 * Create Kafka Producer (Singleton)
 */
const createProducer = () => {
  if (producer) return producer;

  producer = new Producer({
    'bootstrap.servers': process.env.KAFKA_BOOTSTRAP_SERVERS,
    'client.id': 'checkout-service',
    acks: 'all',
    'message.send.max.retries': 10000000,
    'retry.backoff.ms': 500,
    'socket.keepalive.enable': true,
    'metadata.max.age.ms': 1000,
  });

  producer.on('event.error', (err) => {
    console.error('Kafka Producer Error:', err);
  });

  return producer;
};

/**
 * Connect to Kafka with retry mechanism
 */
const connectToKafka = () => {
  if (connectionPromise) return connectionPromise;

  createProducer();

  connectionPromise = new Promise((resolve) => {
    const tryConnect = () => {
      console.log('Attempting to connect to Kafka...');
      producer.connect(null, (err) => {
        if (err) {
          console.error(
            'Kafka connection failed, retrying in 2 seconds...',
            err
          );
          setTimeout(tryConnect, 2000);
        } else {
          console.log('Connected to Kafka successfully');
          isConnected = true;
          resolve();
        }
      });
    };
    tryConnect();
  });

  return connectionPromise;
};

/**
 * Ensure producer is ready before use
 */
const waitForConnection = async () => {
  if (isConnected) return;
  await connectToKafka();
};

/**
 * Get producer safely
 */
const getProducer = () => {
  if (!producer || !isConnected) {
    throw new Error('Kafka producer not ready');
  }
  return producer;
};

/**
 * Required polling for librdkafka
 */
setInterval(() => {
  if (producer && isConnected) {
    producer.poll();
  }
}, 100);

/**
 * Auto-connect on startup
 */
connectToKafka();

module.exports = {
  connectToKafka,
  waitForConnection,
  getProducer,
};
