const { Event } = require('../models');

const findAll = () =>
  Event.findAll({
    attributes: { exclude: ['total_kuota'] },
  });
const findById = (id) =>
  Event.findByPk(id, {
    attributes: {
      exclude: ['total_kuota'],
    },
  });
const create = (payload) => Event.create(payload);
const update = (id, payload) => Event.update(payload, { where: { id: id } });
const remove = (id) => Event.destroy({ where: { id: id } });

module.exports = { findAll, findById, create, update, remove };
