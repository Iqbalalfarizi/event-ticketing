const eventsRepo = require('./eventtix.repositories');
const redis = require('../config/redis');

const TTL = process.env.REDIS_TTL || 60;

const getEvents = async () => {
  const cacheKey = 'events:all';

  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    console.log('Get events from redis caching');
    return JSON.parse(cachedData);
  }
  console.log('Get events from DB');

  const events = await eventsRepo.findAllEvents();

  await redis.set(cacheKey, JSON.stringify(events), 'EX', TTL);

  return events;
};

const getDetailEvent = async (id) => {
  const cacheKey = `events:${id}`;
  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    console.log(`Get event ${id} from redis`);
    return JSON.parse(cachedData);
  }
  console.log(`Get event ${id} from DB`);

  const event = await eventsRepo.findById(id);

  if (!event) return null;
  await redis.set(cacheKey, JSON.stringify(event), 'EX', TTL);
  return event;
};

const createEvent = async (payload) => {
  const { judul, tanggal_event, harga, lokasi, total_kuota } = payload;
  if (!judul || !tanggal_event || !lokasi) {
    throw new Error('Required fields missing');
  }
  if (harga < 0) throw new Error('harga cant be negative');

  if (total_kuota < 0) throw new Error('total kuota cant be negative');

  const sisa_kuota = total_kuota;

  const result = await eventsRepo.create({
    judul,
    tanggal_event,
    harga,
    lokasi,
    total_kuota,
    sisa_kuota,
  });

  await redis.del('events:all');

  return {
    id: result.insertId,
    judul,
    tanggal_event,
    harga,
    lokasi,
    total_kuota,
    sisa_kuota,
  };
};

module.exports = {
  getEvents,
  getDetailEvent,
  createEvent,
};
