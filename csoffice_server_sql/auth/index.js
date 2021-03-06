const express = require('express');

const router = express.Router();

// Route paths prepended with /auth

router.get('/', (req, res) => {
    res.json({
        message: 'from /auth',
    });
});

// Users can login with valid email/password
// Users cant login with a blank or missing email
// Users cannot login with a blank or incorrect password

function validUser(user) {
    const validEmail = typeof user.email === 'string' &&
                        user.email.trim() !== '';
    const validPassword = typeof user.password === 'string' &&
                            user.password.trim() !== '' &&
                            user.passwor.trim().length >= 6;
    return validEmail && validPassword;
}

router.post('/signup', (req, res, next) => {
    if (validUser(req.body)) {
        res.json({
            message: 'from /auth/signup',
        });
    } else {
    // send an error
        next(new Error('Invalid user'));
    }
});


module.exports = router;
