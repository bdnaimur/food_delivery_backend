import express from 'express';

import { createRestaurant, getAllRestaurants, getRestaurant, getRestaurantsBySubCategory } from './../controllers/restaurant.controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Route to create a new sub-category
router.post('/',auth, createRestaurant);

router.get("/", getAllRestaurants)

router.get("/sub-category/:id", getRestaurantsBySubCategory)

// Route to get all sub-categories under a specific category
router.get('/:id',auth, getRestaurant);

export default router;
