const express = require('express');
const bookRoutes = require('./routes/bookingtix.routes');
const sequelize = require('./utils/db');
require('./models');

const app = express();
app.use(express.json());

app.use('/checkout', bookRoutes);

sequelize.sync({ force: false }).catch(console.error);

module.exports = app;
