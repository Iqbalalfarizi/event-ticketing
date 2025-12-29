const bookingService = require('../services/bookingtix.services');

const booking = async (req, res, next) => {
  try {
    console.log(req.body);

    const result = await bookingService.booking(req.body);

    if (!result) {
      console.log('error ', error.message, result);
    }

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
