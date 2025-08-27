const apiRoutes = require('./routes/api');
const cors = require('cors'); 
const express = require('express');
require('dotenv').config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

module.exports = app;
