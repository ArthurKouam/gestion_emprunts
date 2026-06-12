require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = async () => {
  const conn = require('./config/db');
  await conn();
};
const seedData = require('./utils/seeder');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const equipmentRoutes = require('./routes/equipmentRoutes');
const loanRoutes = require('./routes/loanRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database and Seed Data
connectDB().then(() => {
  seedData();
});

// Middleware
app.use(cors());
app.use(express.json());

// Mount Routes
// Auth route matches: POST /api/login
app.use('/api', authRoutes);

// Equipment routes support both singular and plural:
// GET & POST /api/equipment
// GET & POST /api/equipments
app.use('/api/equipment', equipmentRoutes);
app.use('/api/equipments', equipmentRoutes);

// Loan routes support both singular and plural:
// POST & GET /api/loans, PATCH /api/loans/:id/status
// POST & GET /api/loan, PATCH /api/loan/:id/status
// GET /api/loans/student/:studentId or /api/loans/status/:studentId
app.use('/api/loans', loanRoutes);
app.use('/api/loan', loanRoutes);

// Base route for healthcheck
app.get('/', (req, res) => {
  res.json({ message: 'Gestion Emprunts API is running' });
});

// 404 Route handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Route non trouvée: ${req.originalUrl}` });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Une erreur interne est survenue sur le serveur.',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
