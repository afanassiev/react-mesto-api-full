const usersRouter = require('express').Router();
const { usersList, sendUser, getCurrentUser } = require('../controllers/users');

usersRouter.get('/users', usersList);
usersRouter.get('/users/:id', sendUser);
usersRouter.get('/users/me', getCurrentUser);

module.exports = usersRouter;
