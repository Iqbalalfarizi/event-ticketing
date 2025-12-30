require('dotenv').config();
const connectMongo = require('./utils/mongodb');
const consumerRun = require('./consumer/ticketIssued.consumer');

const PORT = process.env.PORT || 3002;

const startServer = async () => {
  try {
    await connectMongo();
    consumerRun();
  } catch (error) {
    console.log('Server error: ', error);
  }
};

startServer();
