import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../models/user.model.js';

dotenv.config();

const auth = async(req, res, next) => {
  const token = req.headers?.authorization;
  
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    
    const user = await userModel.findOne({ email: decoded?.email });
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token related issue' });
  }


//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith("Bearer ")) {
//     return res.sendStatus(401);
//   }

//   // Bearer lshdflshdjkhvjkshdjkvh34h5k3h54jkh
//   const token = authorization.split(" ")[1];

//   try {
//     const decoded = jwt.decode(token) as jwt.JwtPayload;
//     const auth0Id = decoded.sub;

//     const user = await User.findOne({ auth0Id });

//     if (!user) {
//       return res.sendStatus(401);
//     }

//     req.auth0Id = auth0Id as string;
//     req.userId = user._id.toString();
//     next();
//   } catch (error) {
//     return res.sendStatus(401);
//   }
};

export default auth;
