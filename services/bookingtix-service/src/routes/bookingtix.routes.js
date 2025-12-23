const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookingtix.services');

router.post('/', bookController.booking);

module.exports = router;
