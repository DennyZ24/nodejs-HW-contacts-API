const { authenticateUser } = require('../services/usersServices');

const auth = async (req, res, next) => { 
  
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next({status: 401, message: 'Not authorized'})
  }

  const user = await authenticateUser(token);

  if (!user) {
    next({status: 401, message: 'Not authorized'})
  }

  req.user = user;
  next();
};

module.exports = { auth };