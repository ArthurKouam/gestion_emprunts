const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, "Le matricule de l'étudiant est requis"],
    trim: true,
  },
  equipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment',
    required: [true, "L'équipement est requis"],
  },
  requestDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: {
      values: ['En attente', 'Approuve', 'Refuse', 'Termine'],
      message: '{VALUE} n\'est pas un statut de prêt valide'
    },
    default: 'En attente',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Loan', loanSchema);
