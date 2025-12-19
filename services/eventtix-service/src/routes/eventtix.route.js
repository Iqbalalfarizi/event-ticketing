const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventtix.controller');
const validate = require('../middlewares/validate');
const {
  createEventSchema,
  updateEventSchema,
} = require('../validations/event.validation');

router.post('/', validate(createEventSchema), eventController.create);
router.get('/', eventController.findAll);
router.get('/:id', eventController.findOne);
router.put('/:id', validate(updateEventSchema), eventController.update);

module.exports = router;
