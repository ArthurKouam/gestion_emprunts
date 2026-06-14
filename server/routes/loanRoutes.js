const express = require('express');
const router = express.Router();
const {
  createLoan,
  getLoans,
  getStudentLoans,
  updateLoanStatus,
} = require('../controllers/loanController');

router.route('/')
  .post(createLoan)
  .get(getLoans);

router.patch('/:id/status', updateLoanStatus);

router.get('/student/:studentId', getStudentLoans);
router.get('/status/:studentId', getStudentLoans);

module.exports = router;
