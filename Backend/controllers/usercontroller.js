const User = require('../models/user');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginuser = await User.find({ email });
    if (!loginuser) {
      res.status(403).json({ error: 'userNot Found' });
    }
    if (loginuser) {
      if (password == loginuser.password) {
        res.status({
          message: 'successfully login',
        });
      }
    } else {
      console.log('failed to login');
    }
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  try {
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error updating login:', error);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  register,
  login,
  update,
};
