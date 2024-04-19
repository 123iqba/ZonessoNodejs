import express, { Request, Response } from 'express';
import User, { IUser } from '../models/User';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { email, username } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: 'Email already exists' });
      } else if (existingUser.username === username) {
        return res.status(400).json({ message: 'Username already exists' });
      }
    }

    const newUser = new User(req.body);

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
   
    res.status(500).json({ message: 'Error saving user'});
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user'});
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user'});
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

export default router;