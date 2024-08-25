import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcryptjs'
import auditUtils from '../utils/auditTrail.js';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'restaurant_owner', 'user'],
    required: true,
    default: 'user'
  },
  restaurantId: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.post('save', async function(doc,next) { 
 
  doc.password = undefined;
  console.log("doc", doc);
  
 next()
})

auditUtils.addAuditTrail(userSchema);
auditUtils.addDeleteAuditTrail(userSchema);


export default mongoose.model('User', userSchema);
