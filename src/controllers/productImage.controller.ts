import { Request, Response } from "express";
import { ProductImage } from "../models/productImage.model";
import fs from "fs";
import path from "path";

// Ajouter une ou plusieurs images à un produit
export const addImages = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id;
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      res.status(400).json({ message: "Aucune image téléchargée" });
      return;
    }

    const files = req.files as Express.Multer.File[];

    // Enregistrer chaque image dans la BDD
    const images = await Promise.all(
      files.map((file) =>
        ProductImage.create({
          productId,
          imageUrl: file.filename, // on stocke juste le nom du fichier ici
        })
      )
    );

    res.status(201).json(images);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'upload", error });
  }
};

// Lister toutes les images d’un produit
export const getImages = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const images = await ProductImage.findAll({ where: { productId } });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Supprimer une image spécifique d’un produit
export const deleteImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, imgId } = req.params;

    const image = await ProductImage.findOne({
      where: { id: imgId, productId: id },
    });
    if (!image) {
      res.status(404).json({ message: "Image non trouvée" });
      return;
    }

    // Supprimer fichier physique
    const filePath = path.join(__dirname, "../../uploads", image.imageUrl);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Erreur suppression fichier:", err);
    });

    await image.destroy();

    res.json({ message: "Image supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur suppression", error });
  }
};
