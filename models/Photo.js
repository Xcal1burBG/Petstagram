const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [2, 'Name must be at least 2 characters long!']
    },

    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: [/^https?:\/\/.*/, 'Image must start with http or https!']
    },

    age: {
        type: Number,
        required: [true, 'Age is required'],
        minLength: [1, 'Age must be more than 1'],
        maxLength: [100, 'Age can\'t be more than 100']

    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [5, 'Description must be more than 5 characters long!'],
        maxLength: [50, 'Description must be less than 50 characters long!']

    },

    location: {
        type: String,
        required: [true, 'Location is required'],
        minLength: [5, 'Location must be more than 5 characters long!'],
        maxLength: [50, 'Location must be less than 50 characters long!']

    },

    ownersUsername: {
        type: String

    },


    commentList: [{
        userId: { type: mongoose.Types.ObjectId, ref: 'User' },
        comment: { type: String, required: true }
    }],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',

    }

});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;