const Redis = require('ioredis');

let redisClient;

const connectRedis = async () => {
  redisClient = new Redis({
    host: process.env.REDIS_HOST || 'redis',
    port: process.env.REDIS_PORT || 6379,
  });

  redisClient.on('connect', () => {
    console.log('✅ Redis connected');
  });

  redisClient.on('error', (err) => {
    console.error('❌ Redis error:', err);
  });
};

const getRedis = () => redisClient;

module.exports = {
  connectRedis,
  getRedis,
};
