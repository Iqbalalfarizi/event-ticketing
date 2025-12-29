const express = require('express');
const bookRoutes = require('./routes/bookingtix.routes');
require('./models');

const app = express();
app.use(express.json());

app.use('/checkout', bookRoutes);

module.exports = app;
