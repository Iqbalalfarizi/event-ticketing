const consumer = require('../utils/kafka');
const { handleTicketIssued } = require('../services/notification.service');

const consumerRun = () => {
  console.log('Starting notification consumer...');

  consumer.connect();

  consumer.on('ready', () => {
    console.log('✅ Kafka consumer READY');

    consumer.subscribe(['ticket_issued']);

    consumer.consume((error, message) => {
      if (error) {
        console.error('❌ Consume error:', error);
        return;
      }

      console.log('🔥 CONSUMER TERPANGGIL');

      const rawValue = message.value.toString();
      console.log('📩 RAW MESSAGE:', rawValue);

      try {
        const value = JSON.parse(rawValue);
        console.log('✅ PARSED:', value);

        handleTicketIssued(value);
      } catch (err) {
        console.error('❌ JSON ERROR:', err);
      }
    });
  });

  consumer.on('event.error', (err) => {
    console.error('❌ Kafka ERROR:', err);
  });
};

module.exports = consumerRun;
