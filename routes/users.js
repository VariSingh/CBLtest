const express = require('express');
const usersRouter = express.Router();
const userController = require('../controllers/user');
const { authPassword, authenticate } = require("../lib/auth");
const multer = require('multer');
var storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '');
    }
});

var upload = multer({ storage: storage }).single('profileImage');

usersRouter.post('/', (req, res) => userController.signup(req,res));
usersRouter.post('/login', (req, res) => userController.login(req,res));

usersRouter.post('/booking', authenticate, (req, res) => userController.booking(req,res));

module.exports = usersRouter;
