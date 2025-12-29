require('dotenv').config();
const app = require('./app');
const { sequelize, connectDB } = require('./utils/db');
const { connectToKafka } = require('./utils/kafka');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ MySQL connected');

    await sequelize.sync();
    console.log('✅ Database synced');

    await connectToKafka();
    console.log('✅ Kafka connected');

    await app.listen(PORT, () => {
      console.log(`Booking Ticket Service Runnning on Port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
