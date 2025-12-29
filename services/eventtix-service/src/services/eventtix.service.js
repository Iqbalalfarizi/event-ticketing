const eventsRepo = require('../repository/eventtix.repositories');
const { getRedis } = require('../utils/redis');

const TTL = Number(process.env.REDIS_TTL) || 60;

const getEvents = async () => {
  const redis = getRedis();
  const cacheKey = 'events:all';
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log('Data get from redis');
      return JSON.parse(cached);
    }
  } catch (error) {
    console.warn('Redis unavailable, fallback to DB');
  }

  const events = await eventsRepo.findAll();

  try {
    await redis.set(cacheKey, JSON.stringify(events), 'EX', TTL);
  } catch (error) {
    console.warn('Failed to set redis cache');
  }

  return events;
};

const getDetailEvent = async (id) => {
  const redis = getRedis();
  const cacheKey = `events:${id}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log(`Get event id=${id} from redis cache`);
      return JSON.parse(cached);
    }
  } catch (error) {}

  const event = await eventsRepo.findById(id);

  try {
    if (!event) {
      return null;
    }
    await redis.set(cacheKey, JSON.stringify(event), 'EX', TTL);
  } catch (error) {}

  return event;
};

const createEvent = async (payload) => {
  const redis = getRedis();
  const data = {
    ...payload,
    sisa_kuota: payload.total_kuota,
  };

  await redis.del('events:all');
  return eventsRepo.create(data);
};

const updateEvent = async (id, payload) => {
  const redis = getRedis();
  const event = await eventsRepo.findById(id);

  if (!event) return null;

  await eventsRepo.update(id, payload);

  await redis.del('events:all');
  return eventsRepo.findById(id);
};

const deleteEvent = async (id) => {
  const redis = getRedis();

  const event = await eventsRepo.remove(id);
  if (!event) return null;

  await redis.del('events:all');

  return {
    message: 'success deleted event',
  };
};

module.exports = {
  getEvents,
  getDetailEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};
