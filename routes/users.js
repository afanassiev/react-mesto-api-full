const usersRouter = require('express').Router();
const { usersList, sendUser, createUser } = require('../controllers/users');

usersRouter.get('/users', usersList);
usersRouter.get('/users/:id', sendUser);
usersRouter.post('/users', createUser);

module.exports = usersRouter;
