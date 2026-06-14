const Equipment = require('../models/Equipment');

const getEquipments = async (req, res) => {
  try {
    const equipments = await Equipment.find({});
    res.json(equipments);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des équipements', error: error.message });
  }
};


const createEquipment = async (req, res) => {
  const { name, category, status, referenceCode } = req.body;

  if (!name || !category || !referenceCode) {
    return res.status(400).json({
      status: 'error',
      message: 'Veuillez fournir un nom, une catégorie et un code de référence'
    });
  }

  try {
    const existingEquipment = await Equipment.findOne({ referenceCode });
    if (existingEquipment) {
      return res.status(400).json({
        status: 'error',
        message: `Le code de référence "${referenceCode}" existe déjà dans la base de données.`
      });
    }

    const equipment = new Equipment({
      name,
      category,
      status: status || 'En stock',
      referenceCode,
    });

    const createdEquipment = await equipment.save();
    res.status(201).json({
      status: 'success',
      data: createdEquipment
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Le code de référence existe déjà'
      });
    }
    res.status(500).json({
      status: 'error',
      message: 'Erreur serveur lors de la création de l\'équipement',
      error: error.message
    });
  }
};

const deleteEquipment = async (req, res) => {
  const { id } = req.params;

  try {
    const equipment = await Equipment.findById(id);
    if (!equipment) {
      return res.status(404).json({
        status: 'error',
        message: 'Équipement introuvable.'
      });
    }

    await Equipment.findByIdAndDelete(id);
    res.json({
      status: 'success',
      message: 'Équipement retiré avec succès de la base de données.'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Erreur serveur lors du retrait de l\'équipement',
      error: error.message
    });
  }
};

module.exports = {
  getEquipments,
  createEquipment,
  deleteEquipment,
};

