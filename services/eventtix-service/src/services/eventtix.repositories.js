const db = require('../config/db');

const findAllEvents = async () => {
  const [rows] = await db.query(
    `SELECT id, judul, tanggal_event, harga, lokasi, sisa_kuota FROM events ORDER BY tanggal_event ASC`
  );

  return rows;
};

const findById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM events WHERE id = ?`, [id]);

  return rows[0];
};

const create = async (payload) => {
  const { judul, tanggal_event, harga, lokasi, total_kuota, sisa_kuota } =
    payload;
  const result = await db.query(
    `
  INSERT INTO events 
  (judul, tanggal_event, harga, lokasi, total_kuota, sisa_kuota)
  VALUES (?, ?, ?, ?, ?, ?)
  `,
    [judul, tanggal_event, harga, lokasi, total_kuota, sisa_kuota]
  );
  return result;
};

module.exports = {
  findAllEvents,
  findById,
  create,
};
