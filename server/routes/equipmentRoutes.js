const express = require('express');
const router = express.Router();
const { getEquipments, createEquipment, deleteEquipment } = require('../controllers/equipmentController');

router.route('/')
  .get(getEquipments)
  .post(createEquipment);

router.route('/:id')
  .delete(deleteEquipment);

module.exports = router;
