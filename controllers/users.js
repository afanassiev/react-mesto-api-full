const User = require('../models/user');

module.exports.usersList = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка на стороне сервера' }));
};

module.exports.sendUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('InvalidID'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'InvalidID') {
        return res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка: переданы некорректные данные!' });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера' });
    });
};
