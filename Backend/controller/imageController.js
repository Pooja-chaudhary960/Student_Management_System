import fs from "fs";
import path from "path";
import Image from "../model/Image.js";

export const geneateImage = async (req, res) => {
  try {
    console.log(req.file);

    const { title, description } = req.body;

    if (!req.file) {
      return res.json("");
    }

    const imageCreate = await Image.create({
      title,
      description,
      image: req.file.filename,
    });

    res.status(201).json({
      success: true,
      message: "Image created successfully",
      imageCreate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create Image",
      error: error.message,
    });
  }
};

export const DeleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;

    // Find image
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Delete image from uploads folder
    const imagePath = path.join("uploads", image.image);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Delete image from MongoDB
    await Image.findByIdAndDelete(imageId);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete image",
      error: error.message,
    });
  }
};

export const updateImage = async (req, res) => {
  try {
    const imageId = req.params.id;

    // Get data from request
    const { title, description } = req.body;

    // Find existing image
    const image = await Image.findById(imageId);

    // Check image exists
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Update title and description
    image.title = title || image.title;
    image.description = description || image.description;

    // If new image is uploaded
    if (req.file) {
      // Path of old image
      const oldImagePath = path.join("uploads", image.image);

      // Delete old image from folder
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      // Store new image filename
      image.image = req.file.filename;
    }

    // Save updated data in MongoDB
    await image.save();

    res.status(200).json({
      success: true,
      message: "Image updated successfully",
      image: image,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating image",
      error: error.message,
    });
  }
};
