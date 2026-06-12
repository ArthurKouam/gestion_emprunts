const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Le nom de l'équipement est requis"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "La catégorie de l'équipement est requise"],
    trim: true,
  },
  status: {
    type: String,
    enum: {
      values: ['En stock', 'Emprunte', 'Maintenance'],
      message: '{VALUE} n\'est pas un statut valide pour un équipement'
    },
    default: 'En stock',
  },
  referenceCode: {
    type: String,
    required: [true, "Le code de référence est requis"],
    unique: true,
    trim: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Equipment', equipmentSchema);
