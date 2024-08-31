import express from 'express';
import {
  createCuisine,
  getAllCuisines
} from '../controllers/cuisine.controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Route to create a new sub-category
router.post('/',auth, createCuisine);

router.get("/", getAllCuisines)


export default router;
