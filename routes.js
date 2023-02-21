const router = require('express').Router();

const authController = require('./controllers/authController');
const photoController = require('./controllers/photoController');

router.use(authController);
router.use(photoController);
router.get('*', (req, res) => {
    res.render('home/404');
});




module.exports = router; 