import mongoose from 'mongoose';
const { Schema } = mongoose;

const auditTrailSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  action: {
    type: String,
    enum: ['CREATE', 'UPDATE', 'DELETE'],
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  modelId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  changes: {
    type: Map,  // Storing key-value pairs of changes
    of: String | Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('AuditTrail', auditTrailSchema);

