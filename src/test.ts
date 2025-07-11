import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Test minimal OK');
});

app.listen(3000, () => {
  console.log('Serveur test démarré sur le port 3000');
});





// import express, { Request, Response } from 'express';
// import dotenv from 'dotenv';
// import { sequelize } from './config/database';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// app.get('/', (req: Request, res: Response) => {
//   res.send('API en ligne 🚀');
// });

// sequelize.authenticate()
//   .then(() => {
//     console.log('Connexion à MySQL réussie');
//     app.listen(PORT, () => {
//       console.log(`Serveur en ligne sur http://localhost:${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Erreur de connexion MySQL:', error);
//   });
