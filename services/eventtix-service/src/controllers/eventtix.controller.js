const eventService = require('../services/eventtix.service');

const findAll = async (req, res, next) => {
  try {
    const events = await eventService.getEvents();
    res.status(200).json({
      success: true,
      message: 'Success get events data',
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const event = await eventService.getDetailEvent(req.params.id);
    return res.status(200).json({
      success: true,
      message: 'Success get event data',
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const result = await eventService.createEvent(req.body);

    res.status(201).json({
      success: true,
      message: 'Success created event',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    const updatedEvent = await eventService.updateEvent(id, payload);

    return res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent,
    });
  } catch (error) {}
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
};
