import { Request, Response } from "express";
import { Product } from "../models/product.model";
import { Category } from "../models/category.model";
import { ProductImage } from "../models/productImage.model";

// Lister tous les produits avec leurs images et catégorie
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: ProductImage, as: "images" },
        { model: Category, as: "category" },
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Obtenir un produit par ID avec ses images et catégorie
// export const getProductById = async (req: Request, res: Response) => {
//   try {
//     const product = await Product.findByPk(req.params.id, {
//       include: [
//         { model: ProductImage, as: 'images' },
//         { model: Category, as: 'category' },
//       ],
//     });
//     if (!product) {
//       return res.status(404).json({ message: 'Produit non trouvé' });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: 'Erreur serveur', error });
//   }
// };

// Obtenir un produit par ID avec ses images et catégorie
export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: ProductImage, as: "images" },
        { model: Category, as: "category" },
      ],
    });

    if (!product) {
      res.status(404).json({ message: "Produit non trouvé" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Créer un produit (sans images ici)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      categoryId,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Données invalides", error });
  }
};

// Modifier un produit par ID
export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Produit non trouvé" });
      return;
    }

    await product.update({ name, description, price, stock, categoryId });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Erreur mise à jour", error });
  }
};

// Supprimer un produit (et ses images)
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Produit non trouvé" });
      return;
    }

    // Supprimer toutes les images liées
    await ProductImage.destroy({ where: { productId: product.id } });

    await product.destroy();
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur suppression", error });
  }
};
