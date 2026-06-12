const express = require('express');
const router = express.Router();
const {
  createLoan,
  getLoans,
  getStudentLoans,
  updateLoanStatus,
} = require('../controllers/loanController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(createLoan)
  .get(protect, getLoans);

router.patch('/:id/status', protect, updateLoanStatus);

router.get('/student/:studentId', getStudentLoans);
router.get('/status/:studentId', getStudentLoans);

module.exports = router;
