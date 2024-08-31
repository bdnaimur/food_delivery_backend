// models/Restaurant.js
import mongoose from 'mongoose';
import auditUtils from '../utils/auditTrail.js';

// const restaurantSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   imageUrl: {
//     type: String,
//   },
//   rating: {
//     type: Number,
//     min: 0,
//     max: 5,
//   },
// //   cuisineType: {
// //     type: String,  // General cuisine type like "Italian"
// //     required: true,
// //   },
// userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//   },
//   menuItems: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'MenuItem',
//     },
//   ],
// });

// const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
        type: String,
      },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    trim: true, 

    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  menuItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
    },
  ],
  isOpened: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0
  },
  cuisines: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cuisine' // Assuming you have a 'Cuisine' model
  }],
  description: {
    type: String,
    trim: true
  },
  signatureMenu: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem' // Assuming you have a 'MenuItem' model
  }],
  schedules: [{
    dayOfWeek: {
      type: Number, // 0 for Sunday, 1 for Monday, etc.
      required: true
    },
    openingTime: {
      type: String,
      required: true
    },
    closingTime: {
      type: String,
      required: true
    }
  }],
  ownerName: {
    type: String,
    required: true,
    trim: true
  }
});

restaurantSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});


auditUtils.addAuditTrail(restaurantSchema);
auditUtils.addDeleteAuditTrail(restaurantSchema);



export default mongoose.model('Restaurant', restaurantSchema);
