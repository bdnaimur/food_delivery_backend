import mongoose from 'mongoose';
import auditUtils from '../utils/auditTrail.js';

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` on every save
subCategorySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

auditUtils.addAuditTrail(subCategorySchema);
auditUtils.addDeleteAuditTrail(subCategorySchema);

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

export default SubCategory;
