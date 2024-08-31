
import Cuisine from '../models/cuisine.model.js';

export const createCuisine = async (req, res) => {
  try {
    const { name, description } = req.body;

    const cuisine = new Cuisine({
      name,
      description,
      userId: req.user._id
    });

    await cuisine.save();

    res.status(201).json(cuisine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// export const getSubCategoriesByCategory = async (req, res) => {
//     try {
//       const { cuisineId } = req.params;
  
//       const cuisine = await Cuisine.find({ cuisineId });
//       res.status(200).json(cuisine);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  

  export const getAllCuisines = async(req, res) =>{
    try {
      const cuisine = await Cuisine.find();
      res.status(200).json(cuisine);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }