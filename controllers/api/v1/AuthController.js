const {User} = require('../../../models/api/v1/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during signup.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during login.' });
  }
};
