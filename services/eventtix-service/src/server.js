require('dotenv').config();
const app = require('./app');
const { sequelize, connectDB } = require('./utils/db');
const consumerRun = require('./services/event-consumer');
const { connectRedis } = require('./utils/redis');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ MySQL connected');

    await sequelize.sync();
    console.log('✅ Database synced');

    await connectRedis();
    console.log('✅ Redis connected');

    consumerRun();
    console.log('✅ Kafka Consumer RUN');

    app.listen(PORT, () => {
      console.log(`🚀 EventTix Service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
