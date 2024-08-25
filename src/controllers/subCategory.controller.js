import SubCategory from '../models/subCategory.model.js';
import Category from '../models/category.model.js';

export const createSubCategory = async (req, res) => {
  try {
    const { name, description, imageUrl, categoryId } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const subCategory = new SubCategory({
      name,
      description,
      imageUrl,
      categoryId,
      userId: req.user._id
    });

    await subCategory.save();

    // Optionally, update the Category to include this sub-category
    category.subCategories.push(subCategory._id);
    await category.save();

    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getSubCategoriesByCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
  
      const subCategories = await SubCategory.find({ categoryId });
      res.status(200).json(subCategories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  