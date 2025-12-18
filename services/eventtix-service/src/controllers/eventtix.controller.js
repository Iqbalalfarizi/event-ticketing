const eventService = require('../services/eventtix.service');

const findAll = async (req, res, next) => {
  try {
    const events = await eventService.getEvents();
    res.status(200).json({
      success: true,
      message: 'Success get data events',
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  try {
    const event = await eventService.getDetailEvent(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Success get data event',
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
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  findAll,
  findOne,
  create,
};
