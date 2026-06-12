const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_key_for_gestion_emprunts_lab_2026', {
    expiresIn: '30d',
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'E-mail ou mot de passe incorrect' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur lors de la connexion', error: error.message });
  }
};

module.exports = {
  loginUser,
};
