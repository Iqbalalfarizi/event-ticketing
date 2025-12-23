require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Booking Ticket Service Runnning on Port ${PORT}`);
  });
};

startServer();
