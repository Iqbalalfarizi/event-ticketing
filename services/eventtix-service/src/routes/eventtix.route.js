const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventtix.controller');

router.post('/', eventController.create);
router.get('/', eventController.findAll);
router.get('/:id', eventController.findOne);

module.exports = router;
