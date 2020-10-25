const usersRouter = require('express').Router();
const { usersList, sendUser } = require('../controllers/users');

usersRouter.get('/users', usersList);
usersRouter.get('/users/:id', sendUser);

module.exports = usersRouter;
