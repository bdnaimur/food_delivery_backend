import express from 'express';
import {
  createSubCategory,
  getSubCategoriesByCategory,
  getAllSubCategories
} from '../controllers/subCategory.controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Route to create a new sub-category
router.post('/',auth, createSubCategory);

router.get("/", getAllSubCategories)

// Route to get all sub-categories under a specific category
router.get('/:categoryId',auth, getSubCategoriesByCategory);

export default router;
