import express, { Request, Response } from "express";
// Import d'Express et des types Request et Response pour TypeScript

import dotenv from "dotenv";
// Import du package dotenv pour gérer les variables d'environnement

import productRoutes from "./routes/product.routes";
// Import des routes produits définies dans product.routes.ts

import categoryRoutes from "./routes/category.routes";
// Import des routes catégories définies dans category.routes.ts

import productImageRoutes from './routes/productImage.routes';

import path from 'path';


dotenv.config();
// Chargement des variables d'environnement depuis le fichier .env

const app = express();
// Création d'une instance de l'application Express

app.use(express.json());
// Middleware pour parser automatiquement le corps des requêtes au format JSON

// Déclaration des routes principales de l'API

app.use("/api/products", productRoutes);
// Toute requête commençant par /api/products sera gérée par productRoutes

app.use("/api/categories", categoryRoutes);
// Toute requête commençant par /api/categories sera gérée par categoryRoutes

app.use('/api/products', productImageRoutes);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Route simple pour vérifier que l'API fonctionne
app.get("/", (req: Request, res: Response) => {
  res.send("API en ligne 🚀");
});
// Middleware pour gérer les routes non définies (404 Not Found)
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});
export default app;
// Export de l'application Express pour être utilisée ailleurs (par ex. dans server.ts)
