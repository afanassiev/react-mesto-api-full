const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { usersList, sendUser, getCurrentUser } = require('../controllers/users');

usersRouter.get('/users', usersList);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
}), sendUser);
module.exports = usersRouter;
