import Audit from '../models/audit.model.js';

// Get all auditTrails
export const getAuditTrails = async (req, res) => {
  try {
    const auditTrails = await Audit.find();
    res.status(200).json(auditTrails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single auditTrail by ID
export const getAuditById = async (req, res) => {
  try {
    const auditTrail = await Audit.findById(req.params.id);
    if (!auditTrail) {
      return res.status(404).json({ message: 'Audit not found' });
    }
    res.status(200).json(auditTrail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a auditTrail
export const deleteAudit = async (req, res) => {
  try {
    const auditTrail = await Audit.findByIdAndDelete(req.params.id);

    if (!auditTrail) {
      return res.status(404).json({ message: 'Audit not found' });
    }

    res.status(200).json({ message: 'Audit deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
