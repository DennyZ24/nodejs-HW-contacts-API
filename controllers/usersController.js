const { signupServices, loginServices, logoutServices } = require('../services/usersServices');
const { schemaAuth } = require('../models/users');
const { createError } = require('../helpers/createErrors');

const signupController = async (req, res, next) => {
  try {
    const { error } = schemaAuth.validate(req.body);
  
    if (error) {
      throw createError(400, error.message)
    }
    const createdUser = await signupServices(req.body);

    res.status(201).json(createdUser)
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

module.exports = { signupController, loginController, logoutController, getCurrentUser };