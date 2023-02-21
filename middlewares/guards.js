function isUser() {
    return function (req, res, next) {
        if (res.locals.user) {
            next();
        } else {
            res.redirect('/login');
        }
    };
}

function isGuest() {
    return function (req, res, next) {
        if (res.locals.user) {
            res.redirect('/');
        } else {
            next();
        }
    };
}


module.exports = {
    isUser,
    isGuest
  
};