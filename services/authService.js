const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');


exports.findByUsername = (username) => User.findOne({ username });


exports.register = async (username, email, password, repass) => {

    if (password !== repass) {
        throw new Error('Password missmatch');
    }

    const existingUser = await User.findOne({
        $or: [
            { username },
            { email }
        ]
    });


    if (existingUser) {
        throw new Error('User already exists');
    }

    // TODO: validate password

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // TODO: to check what the service should return
   return await User.create({ username, email, hashedPassword });

    
};

exports.login = async (username, password) => {

    const user = await this.findByUsername(username);

    if (!user) {
        throw new Error('Invalid username or password');
    };

    const isValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isValid) {
        throw new Error('Invalid username or password');

    }


    const payload = {
        _id: user._id,
        username: user.username
    };

    const token = await jwt.sign(payload, SECRET);

    return token;

}