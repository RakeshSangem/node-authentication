// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// // import User from '../models/user.mongo.js';

// try {
//   // passport.serializeUser((user, next) => {
//   //   next(null, user.id);
//   // });

//   // passport.deserializeUser(async (id, next) => {
//   //   try {
//   //     // const user = await User.findById(id);
//   //     next(null, id);
//   //   } catch (error) {
//   //     next(error);
//   //   }
//   // });

//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID:
//           '584307252055-ql4gvk91q0mqg2jr3vjvn00jaiqqsq00.apps.googleusercontent.com',
//         clientSecret: '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',
//         callbackURL: '/auth/google/callback',
//         scope: ['email', 'profile'],
//       },
//       async (_, _, profile, next) => {
//         const newUser = {
//           email: profile._json.email,
//           password: profile._json.sub, // Set user's password as sub (coming from the google)
//           username: profile._json.email?.split('@')[0], // as email is unique, this username will be unique
//           isEmailVerified: true, // email will be already verified
//           role: UserRolesEnum.USER,
//           avatar: {
//             url: profile._json.picture,
//             localPath: '',
//           }, // set avatar as user's google picture
//           loginType: UserLoginType.GOOGLE,
//         };
//         next(null, newUser);

//         // try {
//         //   let user = await User.findOne({ googleId: profile.id });

//         //   if (user) {
//         //     next(null, user);
//         //   } else {
//         //     user = await User.create(newUser);
//         //     next(null, user);
//         //   }
//         // } catch (error) {
//         //   console.error(error);
//         // }
//       }
//     )
//   );
// } catch (error) {
//   console.log(error);
// }
