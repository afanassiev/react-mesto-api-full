const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthorizationErr = require('../errors/authorization-err');
const NotFoundErr = require('../errors/not-found-err');
const ConflictErr = require('../errors/conflict-err');

module.exports.usersList = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

module.exports.sendUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundErr())
    .then((user) => {
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 8)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new AuthorizationErr('Ошибка авторизации. Проверьте правильность введенных данных');
      } else if (err.name === 'MongoError') {
        throw new ConflictErr('Пользователь с таким email уже существует');
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ id: user.id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => next(new AuthorizationErr('Ошибка авторизации. Проверьте правильность введенных данных')));
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.params.id !== 'me' ? req.params.id : req.user)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      throw new NotFoundErr('Пользователя с указанным ID не существует');
    })
    .catch(next);
};
