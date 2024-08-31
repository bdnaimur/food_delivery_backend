import Restaurant from '../models/restaurant.model.js';
import MenuItem from '../models/menuItem.model.js';


export const createRestaurant = async (req, res) => {
  try {
    const { name, address, imageUrl, phone, rating, menuItems } = req.body;

    // const restaurant = await Restaurant.findById(categoryId);
    // if (!restaurant) {
    //   return res.status(404).json({ message: 'Restaurant not found' });
    // }
    const inputData = {...req.body, userId: req.user._id}

    const restaurant = new Restaurant(inputData);

    await restaurant.save();

    // Optionally, update the Restaurant to include this sub-restaurant
    // restaurant.restaurant.push(restaurant._id);
    // await restaurant.save();

    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate({
      path: 'menuItems',
      model: MenuItem,
      select: 'name price -_id',
      populate: {
        path: 'subCategoryId',
        model: 'SubCategory',
        select: 'name -_id',
        populate: {
          path: 'categoryId',
          model: 'Category',
          select: 'name -_id',
        },
      },
    }).select('-_id');
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate({
      path: 'cuisines',
      model: 'Cuisine',
      select: 'name -_id',
    })
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurantsBySubCategory = async (req, res) => {
  try {
    // Step 1: Find all MenuItems that belong to the specified SubCategory
    const menuItems = await MenuItem.find({
      subCategoryId: req.params.id,
    }).select('_id');

    if (!menuItems.length) {
      return []; // No menu items found for the sub-category
    }

    const menuItemIds = menuItems.map((item) => item._id);

    // Step 2: Find all Restaurants that have these MenuItem IDs
    const restaurants = await Restaurant.find({
      menuItems: { $in: menuItemIds },
    });

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
