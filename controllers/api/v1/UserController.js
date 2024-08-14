const {User} = require('../../../models/api/v1/User');
const bcrypt = require('bcryptjs');

// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json({ data: { users } });
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ message: 'Internal Server Error - getAllUsers' });
    }
};

module.exports = {
    getAllUsers
};