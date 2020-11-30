const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { usersList, sendUser, getCurrentUser } = require('../controllers/users');

usersRouter.get('/users', usersList);

usersRouter.get('/users/:id', celebrate({
    body: Joi.object().keys({
        _id: Joi.string().hex().length(24)
    })
}), sendUser);

usersRouter.get('/users/me', celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(30)
    })
}), getCurrentUser);

module.exports = usersRouter;
