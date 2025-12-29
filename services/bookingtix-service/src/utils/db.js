require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: console.log,
    dialectOptions: {
      ssl: false,
    },
  }
);

const connectDB = async () => {
  let retries = 10;

  while (retries) {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connected');
      return;
    } catch (err) {
      console.log('⏳ DB not ready, retrying in 5s...', err.code);
      retries -= 1;
      await new Promise((res) => setTimeout(res, 5000));
    }
  }

  throw new Error('❌ Cannot connect to database after retries');
};

module.exports = { sequelize, connectDB };
