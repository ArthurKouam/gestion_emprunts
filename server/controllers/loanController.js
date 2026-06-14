const Loan = require('../models/Loan');
const Equipment = require('../models/Equipment');


const createLoan = async (req, res) => {
  const { studentId, matricule, referenceCode, equipmentId } = req.body;

  const student = studentId || matricule;

  if (!student) {
    return res.status(400).json({ message: "Le matricule de l'étudiant (studentId/matricule) est requis." });
  }

  try {
    let equipment;

    if (referenceCode) {
      equipment = await Equipment.findOne({ referenceCode });
      if (!equipment) {
        return res.status(404).json({ message: `Aucun équipement trouvé avec le code de référence: ${referenceCode}` });
      }
    } else if (equipmentId) {
      equipment = await Equipment.findById(equipmentId);
      if (!equipment) {
        return res.status(404).json({ message: "Aucun équipement trouvé avec cet identifiant." });
      }
    } else {
      return res.status(400).json({ message: "Veuillez fournir le code de référence (referenceCode) ou l'identifiant (equipmentId) du matériel." });
    }
    if (equipment.status !== 'En stock') {
      return res.status(400).json({
        message: `L'équipement "${equipment.name}" n'est pas disponible pour l'emprunt (Statut actuel: ${equipment.status}).`
      });
    }
    const loan = new Loan({
      studentId: student,
      equipmentId: equipment._id,
      status: 'En attente',
    });

    const savedLoan = await loan.save();

    const populatedLoan = await savedLoan.populate('equipmentId');

    res.status(201).json({
      message: "Demande de prêt créée avec succès et en attente de validation.",
      loan: populatedLoan
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la création de la demande", error: error.message });
  }
};

const getLoans = async (req, res) => {
  try {
    const loans = await Loan.find({}).populate('equipmentId').sort({ requestDate: -1 });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération des prêts", error: error.message });
  }
};

const getStudentLoans = async (req, res) => {
  const { studentId } = req.params;

  try {
    const loans = await Loan.find({
      studentId: { $regex: new RegExp(`^${studentId.trim()}$`, 'i') }
    }).populate('equipmentId').sort({ requestDate: -1 });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération de vos demandes", error: error.message });
  }
};

const updateLoanStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['En attente', 'Approuve', 'Refuse', 'Termine'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      message: `Statut invalide. Les statuts autorisés sont: ${validStatuses.join(', ')}`
    });
  }

  try {
    const loan = await Loan.findById(id);
    if (!loan) {
      return res.status(404).json({ message: "Demande d'emprunt introuvable." });
    }

    const equipment = await Equipment.findById(loan.equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: "Équipement associé à l'emprunt introuvable." });
    }

    const previousLoanStatus = loan.status;
    if (status === 'Approuve') {
      if (equipment.status !== 'En stock' && previousLoanStatus !== 'Approuve') {
        return res.status(400).json({
          message: `Impossible d'approuver. Le matériel "${equipment.name}" n'est pas En stock (Statut actuel: ${equipment.status}).`
        });
      }

      loan.status = 'Approuve';
      equipment.status = 'Emprunte';
    } else if (status === 'Termine') {
      loan.status = 'Termine';
      equipment.status = 'En stock';
    } else if (status === 'Refuse') {
      loan.status = 'Refuse';
      if (previousLoanStatus === 'Approuve') {
        equipment.status = 'En stock';
      }
    } else if (status === 'En attente') {
      loan.status = 'En attente';
      if (previousLoanStatus === 'Approuve') {
        equipment.status = 'En stock';
      }
    }
    await loan.save();
    await equipment.save();

    const populatedLoan = await Loan.findById(id).populate('equipmentId');

    res.json({
      message: `Statut de la demande mis à jour avec succès : ${status}.`,
      loan: populatedLoan
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur lors de la mise à jour de la demande", error: error.message });
  }
};

module.exports = {
  createLoan,
  getLoans,
  getStudentLoans,
  updateLoanStatus,
};
