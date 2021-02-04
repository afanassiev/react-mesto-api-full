const Card = require('../models/card');
const AuthorizationErr = require('../errors/authorization-err');
const ForbiddenErr = require('../errors/forbidden-err');
const NotFoundErr = require('../errors/not-found-err');

module.exports.cardsList = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch(() => next(new AuthorizationErr()));
};

module.exports.removeCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(new NotFoundErr('Не удалось найти карточку'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenErr('Ошибка авторизации');
      }
      res.send({ data: card });
    })
    .catch(next);
};
