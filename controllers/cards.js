const Card = require('../models/card');

module.exports.cardsList = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка на стороне сервера' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Ошибка: переданы некорректные данные!' });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера' });
    });
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(new Error('InvalidID'))
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.message === 'InvalidID') {
        return res.status(404).send({ message: 'Такой карточки не существует' });
      }
      return res.status(500).send({ message: 'Ошибка на стороне сервера' });
    });
};
