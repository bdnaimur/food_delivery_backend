// models/menuItem.js
import mongoose from 'mongoose';
import auditUtils from '../utils/auditTrail.js';

const { Schema, model } = mongoose;

// const menuItemSchema = new Schema(
//   {
//     subCategoryId: {
//       type: Schema.Types.ObjectId,
//       ref: 'SubCategory',
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     description: {
//       type: String,
//       trim: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     imageUrl: {
//       type: String,
//       trim: true,
//     },
//     isAvailable: {
//       type: Boolean,
//       default: true,
//     },
//     cookingTime: {
//       type: Number,
//     },
//     restaurantId:{
//       type: Schema.Types.ObjectId,
//       ref: 'Restaurant'
//     }
//     ,
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

const menuItemSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  name: {
    type: String,
    required:   
 true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true   

  },
  imageUrl: {
    type: String,
    trim: true
  },
  tags: [String],
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCategory'
  },
  cuisineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cuisine'
  },
  available: {
    type: Boolean,
    default: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


// Middleware to update `updatedAt` on every save
menuItemSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});
 
auditUtils.addAuditTrail(menuItemSchema);
auditUtils.addDeleteAuditTrail(menuItemSchema);


const MenuItem = model('MenuItem', menuItemSchema);

export default MenuItem;
