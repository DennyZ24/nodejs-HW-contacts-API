const {
  signupServices,
  loginServices,
  logoutServices,
  updateAvatarServices,
  findUser,
  updateUser,
} = require('../services/usersServices');
const {sendEmail} = require('../services/emailServices');
const {uploadImage} = require('../services/imageServices');
const { schemaAuth, schemaResendEmail } = require('../models/users');
const { createError } = require('../helpers/createErrors');

const signupController = async (req, res, next) => {
  try {
    const { error } = schemaAuth.validate(req.body);
  
    if (error) {
      throw createError(400, error.message)
    }

    const createdUser = await signupServices(req.body);
    await sendEmail(createdUser.email, createdUser.verificationToken);

    res.status(201).json({
      email: createdUser.email,
      subscription: createdUser.subscription,
      avatarURL: createdUser.avatarURL,

    })
  } catch (error) {
    next(error)
  }
};

const loginController = async (req, res, next) => {
  try {
    const { error } = schemaAuth.validate(req.body);
  
    if (error) {
      throw createError(400, error.message)
    }
    const loginUser = await loginServices(req.body);

    res.json(loginUser)
  } catch (error) {
    next(error)
  }
};

const logoutController = async (req, res, next) => {
  try {
    await logoutServices(req.user._id);
    res.sendStatus(204);
  } catch (error) {
    next(error)
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = req.user;
    res.json({
      email: user.email,
      subscription: user.subscription,
    })
  } catch (error) {
    next(error)
  }
};

const updateAvatar = async (req, res, next) => { 
  try {
    const { _id: id } = req.user;
    const avatarURL = await uploadImage(id, req.file);

    const user = await updateAvatarServices(id, {avatarURL})
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const confirmEmail = async (req, res, next) => {
  try {
    const {verificationToken}  = req.params;
    const user = await findUser({ verificationToken });
  
    if (!user) {
      throw createError(404, 'Not Found');
    }

    await updateUser(user._id, { verificationToken: null, verify: true });
    res.json({ message: 'Verification successful' });

  } catch (error) {
    next(error);
  }
};
 
const resendEmail = async (req, res, next) => {
  try {
    const { error } = schemaResendEmail.validate(req.body);
  
    if (error) {
      throw createError(400, error.message)
    }

    const user = await findUser(req.body);

    if (!user) {
       throw createError(404, 'User was not found');
    }

    if (user.verify) {
      res.status(400).json({message: 'Verification has already been passed'})
    }

    sendEmail(user.email, user.verificationToken);
    res.json({message: 'Verification email sent'})

  } catch (error) {
    next(error);
  }
};

module.exports = {
  signupController,
  loginController,
  logoutController,
  getCurrentUser,
  updateAvatar,
  confirmEmail,
  resendEmail,
};