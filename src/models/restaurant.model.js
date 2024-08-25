// models/Restaurant.js
import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
//   cuisineType: {
//     type: String,  // General cuisine type like "Italian"
//     required: true,
//   },
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
});

export default mongoose.model('Restaurant', restaurantSchema);
