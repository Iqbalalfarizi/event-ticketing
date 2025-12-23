const bookingService = require('../services/bookingtix.services');

const booking = async (req, res, next) => {
  try {
    const result = await bookingService.booking(req.body);

    res.status(201).json({
      success: true,
      message: 'Success Book Event',
      data: result,
    });
  } catch (error) {
    console.log('error : ', error.message);
  }
};

module.exports = {
  booking,
};
