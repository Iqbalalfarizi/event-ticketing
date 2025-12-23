require('dotenv').config();
console.log(process.env.DB_HOST);
console.log(process.env.BD_PASS);
console.log(process.env.DB_USER);
console.log(process.env.DB_NAME);

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
};
