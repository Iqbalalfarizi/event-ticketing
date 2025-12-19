const { Event } = require('../models');

const findAll = () => Event.findAll();
const findById = (id) => Event.findByPk(id);
const create = (payload) => Event.create(payload);
const update = (id, payload) => Event.update(payload, { where: { id } });

module.exports = { findAll, findById, create, update };
