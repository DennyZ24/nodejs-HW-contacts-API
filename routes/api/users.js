const express = require('express');
const router = express.Router();
const { signupController, loginController, logoutController, getCurrentUser } = require('../../controllers/usersController');
const { auth } = require('../../middlewares/auth');

router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/logout', auth, logoutController);
router.get('/current', auth,  getCurrentUser)

module.exports =  router ;