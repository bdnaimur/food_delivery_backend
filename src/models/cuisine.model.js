import mongoose from 'mongoose';
import auditUtils from '../utils/auditTrail.js';

const cuisineSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

cuisineSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});


auditUtils.addAuditTrail(cuisineSchema);
auditUtils.addDeleteAuditTrail(cuisineSchema);


const Cuisine = mongoose.model('Cuisine', cuisineSchema);

export default Cuisine;
