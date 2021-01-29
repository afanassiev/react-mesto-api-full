const jwt = require('jsonwebtoken');
const AuthorizationErr = require('../errors/authorization-err');

module.exports = (req, res, next) => {
  const { authorization = '' } = req.headers;

  if (!authorization && !authorization.startsWith('Bearer ')) {
    next(new AuthorizationErr('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new AuthorizationErr('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
