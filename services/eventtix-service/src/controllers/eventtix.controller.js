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

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found!',
      });
    }
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

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: 'Event not found!',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      data: updatedEvent,
    });
  } catch (error) {}
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedEvent = await eventService.deleteEvent(id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: 'Event not found!',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
