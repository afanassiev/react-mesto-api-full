const cardsRouter = require('express').Router();
const { cardsList, createCard, removeCard } = require('../controllers/cards');

cardsRouter.get('/cards', cardsList);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:id', removeCard);

module.exports = cardsRouter;
