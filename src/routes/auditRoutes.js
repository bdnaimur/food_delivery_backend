import express from 'express';

import {
  getAuditTrails,
  getAuditById,
  deleteAudit,
} from '../controllers/audit.controller.js';

const router = express.Router();

// Route to get all categories
router.get('/', getAuditTrails);

// Route to get a single category by ID
router.get('/:id', getAuditById);

// Route to delete a category by ID
router.delete('/:id', deleteAudit);

export default router;