
// 1. Charger les variables d'environnement (.env)
require('dotenv').config();

// 2. Importer les dépendances
const express = require('express');
const cors = require('cors'); // Contrôle des ressources partagées entre origines
const helmet = require('helmet'); // Middleware de sécurité

// 3. Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 5000;

// 4. Middlewares de Sécurité et de Traitement
// Helmet configure divers en-têtes HTTP en HTTPS pour la sécurité
app.use(helmet()); 

// Configuration pour autoriser UNIQUEMENT la homepage 
const allowedOrigins = [
  'http://localhost:5173', // L'URL de développement de la Home Page
  process.env.FRONTEND_URL  // L'URL de production de la Home Page
];

const corsOptions = {
  origin: (origin, callback) => {
    // Autoriser les requêtes sans 'origin' (ex: Postman, requêtes serveur à serveur)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

// Middleware pour parser le JSON des requêtes (pour recevoir les données du formulaire de reservation)
app.use(express.json());

// 5. Route de Test (Endpoint de base)
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'API Gateway is running securely!',
    version: '1.0.0'
  });
});

// 6. Démarrage de notre backend
app.listen(PORT, () => {
  console.log(`\n\n🛡️ API Gateway running on port : ${PORT}`);
});