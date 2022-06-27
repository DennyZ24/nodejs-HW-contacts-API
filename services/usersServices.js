const {User} = require('../models/users')
const { createError } = require('../helpers/createErrors');
const bcript = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {SECRET_KEY} = process.env;


const signupServices = async (userData) => {
  const { email, password } = userData;
  const someUser = await User.findOne({ email });

  if (someUser) {
    throw createError(409, 'Email in use');
  }

  const hashedPassword = await bcript.hash(password, 10);

  return User.create({
    ...userData,
    password: hashedPassword
  });
};

const loginServices = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, 'Email or password is wrong')
  }

  const isValidPassword = await bcript.compare(password, user.password);
  if (!isValidPassword) {
    throw createError(401, 'Email or password is wrong')
  }
  
  const payload = {
    id: user._id,
    subscription: user.subscription,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  return await User.findByIdAndUpdate(user._id, { token }, {new: true});
};

const authenticateUser = async (token) => {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    const { id } = payload;
    const user = await User.findById(id);
    
    return user.token !== token ? null : user;
  } catch (error) {
    return null
  }
};

const logoutServices = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
}

module.exports = { signupServices, loginServices, authenticateUser, logoutServices };