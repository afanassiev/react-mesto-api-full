const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { cardsList, createCard, removeCard } = require('../controllers/cards');

cardsRouter.get('/cards', cardsList);

cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom().pattern(/^(https?:\/\/)(www\.)?([\w\W\d]+)(\.)([a-z]{1,10})([\w\W\d]+)?$/),
  }),
}), createCard);

cardsRouter.delete('/cards/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), removeCard);

module.exports = cardsRouter;
