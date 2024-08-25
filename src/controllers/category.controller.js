import Category from '../models/category.model.js';

// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;
    const user = req.user;
    const category = new Category({
      name,
      description,
      imageUrl,
      userId: user._id
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('subCategories');
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;

    // const updateData = {};
    
    // const category = await Category.findByIdAndUpdate(
      //   req.params.id,
      //   updateData,
      //   { new: true }
      // );
      
      const category = await Category.findById(req.params.id)
      
      if (name !== undefined) category.name = name;
      if (description !== undefined) category.description = description;
      if (imageUrl !== undefined) category.imageUrl = imageUrl;
      category.updatedAt = Date.now(); // Always update the updatedAt field

      await category.save()
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// add sub-category to category
// export const addSubCategorytoCategory = async (req, res) => {
//     try {
//     //   const { name, description, imageUrl } = req.body;
  
//       const category = await Category.findByIdAndUpdate(
//         req.params.id,
//         { name, description, imageUrl, updatedAt: Date.now() },
// category.subCategories.push(subCategory._id);
// await category.save();
//         { new: true }
//       );
  
//       if (!category) {
//         return res.status(404).json({ message: 'Category not found' });
//       }
  
//       res.status(200).json(category);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
