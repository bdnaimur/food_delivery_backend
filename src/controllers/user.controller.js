import User from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
// Create a new User
export const createUser = async (req, res) => {
  
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    
};

export const login = async(req, res) =>{
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Find user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Compare passwords
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT token (if using JWT authentication)
      const token = jwt.sign({ userId: user._id, email: user?.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Send success response with token
      res.json({
        result:{
        name: user.name,
        email: user.email,
      },
       token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Get all categories
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single User by ID
export const getUserById = async (req, res) => {
  try {
    const User = await User.findById(req.params.id);
    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a User
export const updateUser = async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;

    const User = await User.findByIdAndUpdate(
      req.params.id,
      { name, description, imageUrl, updatedAt: Date.now() },
      { new: true }
    );

    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// add sub-User to User
// export const addSubUsertoUser = async (req, res) => {
//     try {
//     //   const { name, description, imageUrl } = req.body;
  
//       const User = await User.findByIdAndUpdate(
//         req.params.id,
//         { name, description, imageUrl, updatedAt: Date.now() },
// User.subCategories.push(subUser._id);
// await User.save();
//         { new: true }
//       );
  
//       if (!User) {
//         return res.status(404).json({ message: 'User not found' });
//       }
  
//       res.status(200).json(User);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

// Delete a User
export const deleteUser = async (req, res) => {
  try {
    const User = await User.findByIdAndDelete(req.params.id);

    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
