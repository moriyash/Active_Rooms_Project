const express = require('express');
const router = express.Router();
const current_room_statusController = require('../controllers/current_room_status.controller');

router.get('/', current_room_statusController.getAllCurrentRoomStatus);
router.get('/:room_id', current_room_statusController.getCurrentRoomStatusById);
router.post('/', current_room_statusController.createCurrentRoomStatus);
router.put('/:room_id', current_room_statusController.updateCurrentRoomStatus);
router.delete('/:room_id', current_room_statusController.deleteCurrentRoomStatus);

module.exports = router;
