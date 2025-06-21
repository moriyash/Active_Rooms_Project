const express = require('express');
const router = express.Router();

const areasRoutes = require('./areas.routes');
router.use('/areas', areasRoutes);

module.exports = router;
