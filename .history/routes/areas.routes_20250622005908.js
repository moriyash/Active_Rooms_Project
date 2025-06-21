const express = require('express');
const router = express.Router();
const areasController = require('../controllers/areas.controller');

// כל הפעולות של טבלת areas
router.get('/', areasController.getAllAreas);
router.get('/:id', areasController.getAreaById);
router.post('/', areasController.createArea);
router.put('/:id', areasController.updateArea);
router.delete('/:id', areasController.deleteArea);

module.exports = router;
