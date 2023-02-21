const router = require('express').Router();

const authService = require('../services/authService');
const { isUser, isGuest } = require('../middlewares/guards');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/login',isGuest(), (req, res) => {

    if (res.locals.user) {
        res.redirect('/');
    }
    res.render('auth/login');
});

router.post('/login', isGuest(), async (req, res) => {
    const { username, password } = req.body;

    try {

        const token = await authService.login(username, password);
        res.cookie('auth', token);
        res.redirect('/');


    } catch (error) {
        return res.status(404).render('auth/login', { error: getErrorMessage(error) })
    }

});


router.get('/register', isGuest(), (req, res) => {

    if (res.locals.user) {
        res.redirect('/');
    }
    res.render('auth/register');
});

router.post('/register', isGuest(), async (req, res) => {
    const { username, email, password, repass } = req.body;

    
    try {
        
        if(password.length < 4){
            throw new Error('Password must be more than 4 characters long!');
        }
    
        if(password != repass){
            throw new Error('Passwords missmatch');
        }

        await authService.register(username, email, password, repass);
        const token = await authService.login( username, password);
        res.cookie('auth', token);
        res.redirect('/');

    } catch (error) {
        res.status(400).render('auth/register', { error: getErrorMessage(error) });
    }

    // TODO: where to redirect after registration
});

router.get('/logout', isUser(), (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

module.exports = router;