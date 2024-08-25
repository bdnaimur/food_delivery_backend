import mongoose from 'mongoose';
import auditUtils from '../utils/auditTrail.js';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  imageUrl: {
    type: String,
  },
  subCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory', // Reference by name, not by direct import
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

categorySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});


auditUtils.addAuditTrail(categorySchema);
auditUtils.addDeleteAuditTrail(categorySchema);


const Category = mongoose.model('Category', categorySchema);

export default Category;
