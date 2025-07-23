const express = require('express');
const router = express.Router();

const areasRoutes = require('./areas.routes');
router.use('/areas', areasRoutes);

const areasRoutes = require('./sensors.routes');
router.use('/sensors', areasRoutes);

const areasRoutes = require('./current_room_status.routes');
router.use('/current_room_status', areasRoutes);

module.exports = router;
