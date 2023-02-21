const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: 2
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        minLength: 10,
        validate: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/
    },
    hashedPassword: {
        type: String,
        required: [true, 'Password is required']
    }

});

const User = mongoose.model('User', userSchema);

module.exports = User;

