const Joi = require('joi');

const createEventSchema = Joi.object({
  judul: Joi.string().min(3).required(),
  tanggal_event: Joi.date().iso().required(),
  harga: Joi.number().min(0).required(),
  lokasi: Joi.string().min(3).required(),
  total_kuota: Joi.number().integer().min(1).required(),
});
const updateEventSchema = Joi.object({
  judul: Joi.string().min(3),
  tanggal_event: Joi.date().iso(),
  harga: Joi.number().min(0),
  lokasi: Joi.string().min(3),
  total_kuota: Joi.number().integer().min(1),
}).min(1);

module.exports = {
  createEventSchema,
  updateEventSchema,
};
