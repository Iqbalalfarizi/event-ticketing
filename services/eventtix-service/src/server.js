require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`Event Ticket Service Running On Port ${PORT}`);
  });
};

startServer();
