const router = require('express').Router();
const photoService = require('../services/photoService');
const { isUser, isGuest } = require('../middlewares/guards');
const { getErrorMessage } = require('../utils/errorUtils');
const User = require('../models/User');

router.get('/', (req, res) => {
        res.render('home/index');
});

router.get('/catalog', async (req, res) => {
        const photos = await photoService.getAll();
        res.render('home/catalog', { photos });

});

router.get('/add', isUser(), (req, res) => {
        res.render('photo/create');

});

router.post('/add', isUser(), async (req, res) => {

        const { name, age, description, location, image } = req.body;
        const ownerId = res.locals.user._id;
        const ownerObj = await User.findById(ownerId).lean();
        const ownersUsername = ownerObj.username;

        try {
                await photoService.create(name, age, description, location, image, ownerId, ownersUsername);
                res.redirect('/catalog');
        } catch (error) {
                return res.status(404).render('photo/create', { error: getErrorMessage(error) })
        }
});

router.get('/photo/:photoId/details', async (req, res) => {
        try {
                const photo = await photoService.getFullPhotoDetails(req.params.photoId);
                console.log(photo);
                
                const isAuthor = res.locals.user?._id == photo.owner._id;
                // const comments = await photoService.getComments(req.params.photoId);


                res.render('photo/details', { photo, isAuthor });
        } catch (error) {
                return res.status(404).render('home/catalog', { error: getErrorMessage(error) })
        };
});

router.post('/photo/:photoId/details', isUser(), async (req, res) => {
        try {
                const { comment } = req.body;
                const userId = res.locals.user._id;
                await photoService.addComment(req.params.photoId, userId, comment);


                res.redirect(`/photo/${req.params.photoId}/details`);

        } catch (error) {
                return res.status(404).render('home/catalog', { error: getErrorMessage(error) })
        };

});


router.get('/photo/:photoId/edit', isUser(), async (req, res) => {

        try {

                const photo = await photoService.getById(req.params.photoId);

                if (res.locals.user?._id !== photo.owner._id.toString()) {
                        return res.redirect('/');
                };


                res.render('photo/edit', photo);
        } catch (error) {
                return res.status(404).render('home/catalog', { error: getErrorMessage(error) })
        }
});


router.post('/photo/:photoId/edit', isUser(), async (req, res) => {

        const { name, age, description, location, image } = req.body;

        try {

                const photo = await photoService.getById(req.params.photoId);

                if (res.locals.user._id !== photo.owner._id.toString()) {
                        return res.redirect('/');
                };


                await photoService.update(req.params.photoId, name, age, description, location, image);


                res.redirect(`/photo/${req.params.photoId}/details`);

        } catch (error) {
                return res.status(404).render('photo/edit', { error: getErrorMessage(error), name, age, description, location, image })
        }
});

router.get('/photo/:photoId/delete', isUser(), async (req, res) => {

        const photo = await photoService.getById(req.params.photoId);

        if (res.locals.user._id !== photo.owner._id.toString()) {
                return res.redirect('/');
        };

        await photoService.deletePhoto(req.params.photoId);
        res.redirect('/');
});

router.get('/profile', isUser(), async (req, res) => {
        const user = await User.findById(res.locals.user._id).lean();
        const userPhotos = await photoService.getAllUserPhotos(res.locals.user._id)


        res.render('home/profile', { user, userPhotos });
});


module.exports = router;

