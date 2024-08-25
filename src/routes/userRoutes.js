import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
} from '../controllers/user.controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Route to create a new category
router.post('/register', createUser);

router.post('/login', login);

// Route to get all categories
router.get('/',auth, getUsers);

// Route to get a single category by ID
router.get('/:id',auth, getUserById);

// Route to update a category by ID
router.put('/:id',auth, updateUser);

// Route to delete a category by ID
router.delete('/:id',auth, deleteUser);

export default router;
