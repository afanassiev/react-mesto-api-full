const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { usersList, sendUser, getCurrentUser } = require('../controllers/users');

usersRouter.get('/users', usersList);

usersRouter.get('/users/:id', celebrate({
  body: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), sendUser);

usersRouter.get('/users/me', getCurrentUser);

module.exports = usersRouter;
