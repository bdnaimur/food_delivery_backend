import express from 'express';
import auth from '../middlewares/auth.js';
import { createMenuItem, getAllmenuItems, getMenuItem } from '../controllers/menuItem.controller.js';

const router = express.Router();

// Route to create a new sub-category
router.post('/',auth, createMenuItem);

router.get("/", getAllmenuItems)

// Route to get all sub-categories under a specific category
router.get('/:id',auth, getMenuItem);

export default router;
