const Photo = require('../models/Photo');
const User = require('../models/User');


exports.getById = async (id) => {
    return await Photo.findById(id).lean();
};

exports.getAll = async () => {
    return await Photo.find({}).lean();
};

exports.getFullPhotoDetails = async (photoId) => {
    const photo = await Photo.findById(photoId).populate('commentList.userId').populate('owner').lean();
    return photo;

};

exports.getAllUserPhotos = async (userId) => {
    const photos = await Photo.find({ owner: userId }).lean();

    return photos;

};

exports.create = async (name, age, description, location, image, owner, ownersUsername) => {
    return await Photo.create({ name, age, description, location, image, owner, ownersUsername });
};

exports.update = async (photoId, name, age, description, location, image) => {
    const photo = await Photo.findByIdAndUpdate(photoId, { name, age, description, location, image }, { runValidators: true });
    await photo.save();
};

exports.addComment = async (photoId, userId, comment) => {
    const photo = await Photo.findById(photoId);
    photo.commentList.push({ userId, comment });
    await photo.save();
};


exports.deletePhoto = async (photoId) => {
    return await Photo.findByIdAndRemove(photoId);
};







