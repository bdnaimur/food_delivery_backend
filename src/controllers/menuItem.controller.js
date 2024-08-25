import SubCategory from '../models/subCategory.model.js';
import MenuItem from '../models/menuItem.model.js';

export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, imageUrl, subCategoryId } = req.body;

    const subCategoryResult = await SubCategory.findById(subCategoryId);
    if (!subCategoryResult) {
      return res.status(404).json({ message: 'MenuItem not found' });
    }

    // console.log("req.user", req.user);
    
    const menuItem = new MenuItem({
      name,
      description,
      imageUrl,
      subCategoryId,
      price,
      userId: req.user._id
    });

    await menuItem.save();

    // Optionally, update the MenuItem to include this sub-category
    subCategoryResult.menuItems.push(menuItem._id);
    await subCategoryResult.save();

    res.status(201).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMenuItem = async (req, res) => {
    try {
  
      const menuItem = await MenuItem.findById(req.params.id)
      res.status(200).json(menuItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  export const getAllmenuItems = async(req, res) =>{
    try {
      const menuItems = await MenuItem.find();
      res.status(200).json(menuItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }