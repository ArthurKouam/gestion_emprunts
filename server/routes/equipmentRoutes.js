const express = require('express');
const router = express.Router();
const { getEquipments, createEquipment } = require('../controllers/equipmentController');
const { protect } = require('../middleware/auth');

router.route('/')
  .get(getEquipments)
  .post(protect, createEquipment);

module.exports = router;
