import express from 'express';
import User from '../models/userSchema.js';
import BusinessUser from '../models/businessUserSchema.js';
import bcrypt from 'bcrypt';


const UserRouter = express.Router();
UserRouter.use(express.json());


UserRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    const existBusinessUser = await BusinessUser.findOne({ email })

    if (!existUser && !existBusinessUser) {
      res.status(404).json({ error: 'User not found' });
    }

    if (existUser) {
      const comparePassword = await bcrypt.compare(password, existUser.password);
    } else {
      const comparePassword = await bcrypt.compare(password, existBusinessUser.password);
    }
  
    if (!comparePassword) {
      res.status(401).json({ error: 'Wrong credentials' });
    }

    res.status(201).json({
      msg: 'User logged in',
      user: existUser,
      businessUser: existBusinessUser
    });
  } catch (error) {
    res.status(400).json({ msg: 'Login failed', error: error.message });
  }
});



UserRouter.post('/user_registration', async (req, res) => {
  try {
    const { username, email, phone_number, state_location, lga_location, gender, password } = req.body;

    if (username && email && phone_number && state_location && lga_location && gender && password) {
      const hashPassword = await bcrypt.hash(password, 14);
      const user = await User.create({
        username,
        email,
        phone_number,
        state_location,
        lga_location,
        gender,
        password: hashPassword,
      });

      res.status(200).json({
        msg: 'User registered successfully',
        user: user,
      });
    } else {
      res.status(422).json({ msg: 'Missing credentials' });
    }
  } catch (error) {
    res.status(400).json({ msg: 'Signup failed', error: error.message });
  }
});





UserRouter.post('/business_user_registration', async (req, res) => {
  try {
    const { name, industry, produce, location, contact, password } = req.body;

    if (name && industry && produce && location && contact && password) {
      const hashPassword = await bcrypt.hash(password, 14);
      const user = await BusinessUser.create({
        name,
        industry,
        produce,
        location,
        contact,
        password: hashPassword,
      });

      res.status(200).json({
        msg: 'Business User registered successfully',
        user: user,
      });
    } else {
      res.status(422).json({ msg: 'Missing credentials' });
    }
  } catch (error) {
    res.status(400).json({ msg: 'Signup failed', error: error.message });
  }
});




// // This route is for user password reseting.
// UserRouter.post('/reset-password', async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;

//     // Check if the user with the provided email exists.
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     // Hash the new password.
//     const hashedPassword = await bcrypt.hash(newPassword, 14);

//     // Update the user's password in the database.
//     await User.updateOne({ email }, { password: hashedPassword });

//     res.status(200).json({ msg: 'Password reset successfully' });
//   } catch (error) {
//     res.status(500).json({ msg: 'Internal Server Error', error: error.message });
//   }
// });



// // This route is getting all data for a particular user.
// UserRouter.get('/users/:email', async (req, res) => {
//   try {
//     const userEmail = req.params.email;

//     // Find user in database
//     const user = await User.findOne({ email: userEmail });

//     if (!user) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     res
//       .status(200)
//       .json({ msg: 'User data retrieved successfully', user: user });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ msg: 'Internal Server Error', error: error.message });
//   }
// });



// // This route is deleting a user from the database.
// UserRouter.delete('/users/:email', async (req, res) => {
//   try {
//     const userEmail = req.params.email;

//     // Find and remove user from database based on the email.
//     const deletedUser = await User.findOneAndDelete({ email: userEmail });

//     if (!deletedUser) {
//       return res.status(404).json({ msg: 'User not found' });
//     }

//     res
//       .status(200)
//       .json({ msg: 'User deleted successfully', user: deletedUser });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ msg: 'Internal Server Error', error: error.message });
//   }
// });




export default UserRouter;
