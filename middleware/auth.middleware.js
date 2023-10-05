// verify the user whether they are permitted to access the resource
import jwt from 'jsonwebtoken';

// export function isAuthenticated(req, res, next) {
//   console.log('req.cookies', req);
//   const token = '';

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   // Verify and decode the JWT token
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }

//     // Attach user data to the request for use in protected routes
//     req.user = decoded.user;

//     // Continue to the next middleware or route handler
//     next();
//   });
// }
