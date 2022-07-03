const express = require('express');
const router = express.Router();
const {
  signupController,
  loginController,
  logoutController,
  getCurrentUser,
  updateAvatar,
  confirmEmail,
  resendEmail,
} = require('../../controllers/usersController');
const { auth } = require('../../middlewares/auth');
const upload = require('../../middlewares/upload');


router.post('/signup', signupController);
router.post('/login', loginController);
router.post('/logout', auth, logoutController);
router.get('/current', auth, getCurrentUser);
router.patch('/avatars', auth, upload.single('avatar'), updateAvatar);
router.get('/verify/:verificationToken', confirmEmail);
router.post('/verify', resendEmail)


module.exports =  router ;