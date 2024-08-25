import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Route to create a new category
router.post('/',auth, createCategory);

// Route to get all categories
router.get('/',auth, getCategories);

// Route to get a single category by ID
router.get('/:id',auth, getCategoryById);

// Route to update a category by ID
router.put('/:id',auth, updateCategory);

// Route to delete a category by ID
router.delete('/:id',auth, deleteCategory);

export default router;
