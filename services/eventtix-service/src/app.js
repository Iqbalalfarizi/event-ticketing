const express = require('express');
const cors = require('cors');
const eventRoutes = require('./routes/eventtix.route');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/events', eventRoutes);

module.exports = app;
