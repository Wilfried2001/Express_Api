import { Request, Response } from "express";
import { Category } from "../models/category.model";

// Lister toutes les catégories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Obtenir une catégorie par ID
export const getCategoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Catégorie non trouvée" });
      return;
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Créer une nouvelle catégorie
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: "Données invalides", error });
  }
};


// Modifier une catégorie par ID
export const updateCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name } = req.body;
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Catégorie non trouvée" });
      return;
    }
    await category.update({ name });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: "Erreur mise à jour", error });
  }
};

// Supprimer une catégorie
export const deleteCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: "Catégorie non trouvée" });
      return;
    }

    // Ici, tu peux ajouter une logique si tu veux vérifier si la catégorie est liée à des produits avant suppression

    await category.destroy();
    res.json({ message: "Catégorie supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur suppression", error });
  }
};
