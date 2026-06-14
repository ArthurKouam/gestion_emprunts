# Gestion des Emprunts

Une application web complète pour gérer les emprunts d'équipements dans une institution éducative. Cette application permet aux étudiants de consulter les équipements disponibles, créer des demandes d'emprunt et suivre l'historique de leurs emprunts. Les administrateurs peuvent gérer l'inventaire des équipements et valider les demandes d'emprunt.

## Technologies utilisées

- **Frontend**: React + Vite + JavaScript
- **Backend**: Node.js + Express
- **Base de données**: MongoDB
- **Authentification**: JWT (JSON Web Tokens)
- **Styling**: CSS

## Structure des fichiers

```
gestion_emprunts/
├── README.md                          # Documentation du projet
├── package.json                       # Dépendances et scripts principaux
│
├── client/                            # Application React (Frontend)
│   ├── index.html                     # Point d'entrée HTML
│   ├── package.json                   # Dépendances du client
│   ├── vite.config.js                 # Configuration Vite
│   ├── eslint.config.js               # Configuration ESLint
│   ├── public/                        # Actifs statiques publics
│   │
│   └── src/                           # Code source React
│       ├── main.jsx                   # Point d'entrée JavaScript
│       ├── App.jsx                    # Composant principal
│       ├── styles/                    # Dossier des styles modulaires
│       │   ├── layout.css             # Styles de layout et structure
│       │   ├── components.css         # Styles des composants et utilitaires
│       │   └── portal.css             # Styles des pages portail / login
│       ├── index.css                  # Styles globaux
│       │
│       ├── assets/                    # Images et ressources
│       │
│       ├── components/                # Composants réutilisables
│       │   ├── EquipmentCard.jsx      # Carte d'affichage d'équipement
│       │   ├── InventoryList.jsx      # Liste des équipements
│       │   └── PrivateRoute.jsx       # Route protégée par authentification
│       │
│       ├── context/                   # Contexte React
│       │   ├── auth-context.js        # Configuration du contexte d'auth
│       │   ├── AuthContext.jsx        # Provider du contexte d'auth
│       │   └── useAuth.js             # Hook personnalisé pour l'auth
│       │
│       ├── hooks/                     # Hooks personnalisés
│       │   └── useFetch.js            # Hook pour les appels API
│       │
│       ├── pages/                     # Pages/Vues principales
│       │   ├── Home.jsx               # Page d'accueil
│       │   ├── Login.jsx              # Page de connexion
│       │   ├── About.jsx              # Page À propos
│       │   ├── EquipmentList.jsx      # Liste des équipements
│       │   ├── StudentPortal.jsx      # Portail étudiant
│       │   ├── StudentLoans.jsx       # Mes emprunts (étudiant)
│       │   ├── CreateLoan.jsx         # Créer une demande d'emprunt
│       │   ├── LoanList.jsx           # Liste des demandes d'emprunt
│       │   ├── AdminDashboard.jsx     # Tableau de bord admin
│       │   └── NotFound.jsx           # Page 404
│       │
│       └── services/                  # Services API
│           └── api.js                 # Appels API centralisés
│
├── server/                            # Application Node.js/Express (Backend)
│   ├── index.js                       # Point d'entrée serveur
│   ├── package.json                   # Dépendances du serveur
│   │
│   ├── config/                        # Configuration
│   │   └── db.js                      # Configuration de la base de données
│   │
│   ├── controllers/                   # Contrôleurs (logique métier)
│   │   ├── authController.js          # Gestion de l'authentification
│   │   ├── equipmentController.js     # Gestion des équipements
│   │   └── loanController.js          # Gestion des emprunts
│   │
│   ├── middleware/                    # Middleware Express
│   │   └── auth.js                    # Vérification d'authentification JWT
│   │
│   ├── models/                        # Schémas de données MongoDB
│   │   ├── User.js                    # Schéma utilisateur
│   │   ├── Equipment.js               # Schéma équipement
│   │   └── Loan.js                    # Schéma emprunt
│   │
│   ├── routes/                        # Définition des routes API
│   │   ├── authRoutes.js              # Routes d'authentification
│   │   ├── equipmentRoutes.js         # Routes des équipements
│   │   └── loanRoutes.js              # Routes des emprunts
│   │
│   └── utils/                         # Utilitaires
│       └── seeder.js                  # Script de peuplement de la BD
│
└── scripts/                           # Scripts utilitaires
    └── dev.mjs                        # Script pour démarrer l'env. de dev
```

## Installation

### Prérequis
- Node.js (v14+)
- npm ou yarn
- MongoDB

### Étapes d'installation

1. Clonez le repository
```bash
git clone <url-du-repo>
cd gestion_emprunts
```

2. Installez les dépendances
```bash
npm install
```

3. Installez les dépendances du client et du serveur
```bash
cd client && npm install
cd ../server && npm install
cd ..
```

4. Configurez les variables d'environnement
Créez un fichier `.env` dans le répertoire `server/` avec les variables nécessaires

5. Lancez le serveur de développement
```bash
npm run dev
```

## Scripts disponibles

### À la racine
- `npm run dev` - Lance le serveur de développement (client + server)

### Dans `client/`
- `npm run dev` - Lance le serveur de développement Vite
- `npm run build` - Construit l'application pour la production
- `npm run lint` - Exécute ESLint

### Dans `server/`
- `npm start` - Lance le serveur
- `npm run dev` - Lance le serveur en mode développement avec nodemon

## Fonctionnalités principales

- Authentification avec JWT
- Gestion des utilisateurs (étudiants et administrateurs)
- Gestion de l'inventaire des équipements
- Système de demande d'emprunt
- Portail étudiant personnalisé
- Tableau de bord administrateur
- Protection des routes
