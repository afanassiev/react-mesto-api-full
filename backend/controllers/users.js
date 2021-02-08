const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthorizationErr = require('../errors/authorization-err');
const NotFoundErr = require('../errors/not-found-err');
const ConflictErr = require('../errors/conflict-err');
const BadRequestErr = require('../errors/bad-request-err');

module.exports.usersList = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

module.exports.sendUser = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundErr('Пользователь с таким id не найден'))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestErr('Ошибка запроса');
      } else if (err.statusCode === 404) {
        throw new NotFoundErr('Нет пользователя с таким id');
      }
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
    .then((user) => {
      const newUser = user;
      newUser.password = '';
      res.status(201).send(newUser);
    })
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
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch(() => {
      throw new AuthorizationErr('Ошибка авторизации. Проверьте правильность введенных данных');
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('Пользователь с таким id не найден');
      }
      return res.send({
        data: {
          email: user.email,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        },
      });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestErr('Ошибка запроса');
      }
    })
    .catch(next);
};
