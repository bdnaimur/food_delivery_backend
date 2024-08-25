import AuditTrail from '../models/audit.model.js'; // Adjust the path to your AuditTrail model

// Function to add audit trail for create and update operations
const addAuditTrail = function (schema) {

  // console.log("schema", schema);
  
  schema.pre('save', async function (next) {
    const doc = this;
    const isNew = doc.isNew;
    console.log("doc from audit", this, "isNew", isNew);
    
    const changes = {};

    // if (!isNew) { 
    //   for (const key in doc) {        
    //     if (doc.isModified(key) ) {
    //       if(key !== "toString"){
    //         console.log("each key", key, " : ", doc[key]);
    //       changes[key] = doc[key];
    //       }
    //     }
    //   }
    // }else{
    //   for (const key in this) {        
    //       if(schema.hasOwnProperty(key)){
    //         console.log("each key for new one", key, " : ", doc[key]);
    //       changes[key] = doc[key];
    //       }
    //     }
    // }

    console.log("doc._doc", doc._doc);
    
    if (isNew) {
      // For CREATE operations, include all properties
      for (const key in doc._doc) {
        if (doc._doc.hasOwnProperty(key) && key !== "password" && key !== "updatedAt") {
          changes[key] = doc[key];
        }
      }
    } else {
      for (const key in doc._doc) {
        if (doc.isModified(key) && key !== "updatedAt") {
          changes[key] = doc[key];
        }
      }
    }
    
    let action = undefined;
    if (Object.keys(changes).length > 0 || isNew) {
      action = isNew ? 'CREATE' : 'UPDATE';   
    }

    console.log("changes", changes);

    await AuditTrail.create({
      userId: doc.userId,  // Assuming userId is part of the update
      action: action,
      model: doc.constructor.modelName,
      modelId: doc._id,
      changes: changes,
    });

    next();
  });
};

// Function to add audit trail for delete operations
const addDeleteAuditTrail = function (schema) {
  schema.pre('remove', async function (next) {
    const doc = this;

    await AuditTrail.create({
      userId: doc._update.userId,  // Assuming userId is part of the update
      action: 'DELETE',
      model: doc.constructor.modelName,
      modelId: doc._id,
      changes: {
        // Document was deleted, so we store the original document as a change
        ...doc.toObject(),
      },
    });

    next();
  });
};

export default { addAuditTrail, addDeleteAuditTrail };
