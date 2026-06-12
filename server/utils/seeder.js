const User = require('../models/User');
const Equipment = require('../models/Equipment');

const seedData = async () => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'adminlabo@gmail.com';
    const adminExists = await User.findOne({ email: adminEmail });

    if (!adminExists) {
      // console.log("Création de l'administrateur par défaut...");
      const adminUser = new User({
        name: process.env.ADMIN_NAME || 'Labo Admin',
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'Administrateur',
      });
      await adminUser.save();
      // console.log("Administrateur créé avec succès.");
    }

    const equipmentCount = await Equipment.countDocuments();
    if (equipmentCount === 0) {
      // console.log('Seeding: No equipment found. Creating default inventory...');
      const defaultEquipment = [
        {
          name: 'Raspberry Pi 4 Model B',
          category: 'Microcontrôleur',
          status: 'En stock',
          referenceCode: 'REF-RPI4-001',
        },
        {
          name: 'Arduino Uno R3',
          category: 'Microcontrôleur',
          status: 'En stock',
          referenceCode: 'REF-ARDUNO-002',
        },
        {
          name: 'Routeur Cisco ISR 4331',
          category: 'Réseau',
          status: 'En stock',
          referenceCode: 'REF-CISCO-003',
        },
        {
          name: 'Livre Algorithmique 4ème Édition',
          category: 'Livre',
          status: 'En stock',
          referenceCode: 'REF-BOOK-004',
        },
      ];

      await Equipment.insertMany(defaultEquipment);
      console.log('SUCCESS: Default equipment inventory seeded successfully!');
    } else {
      // console.log('Seeding: Equipment inventory already has items.');
    }
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
  }
};

module.exports = seedData;
