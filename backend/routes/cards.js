const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { cardsList, createCard, removeCard } = require('../controllers/cards');

cardsRouter.get('/cards', cardsList);

cardsRouter.post('/cards', celebrate({
    body: Joi.object().keys({
       name: Joi.string().required().min(2).max(30),
        link: Joi.string().required().uri()
    })
}), createCard);

cardsRouter.delete('/cards/:id', celebrate({
    params: Joi.object().keys({
        _id: Joi.string().hex().length(24)
    })
}), removeCard);

module.exports = cardsRouter;
