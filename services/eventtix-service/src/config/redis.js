const Redis = require('ioredis');
const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on('connect', () => {
  console.log('Redis Connected');
});

redisClient.on('error', (error) => {
  console.log('Redis Error', error);
});

module.exports = redisClient;
