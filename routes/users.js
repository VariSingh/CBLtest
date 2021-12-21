const express = require('express');
const usersRouter = express.Router();
const userController = require('../controllers/user');
const multer = require('multer');
const { authenticate } = require("../lib/auth");
var storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, cb) { 
        cb(null , file.originalname);   
     }
});

var upload = multer({ storage: storage }).single('profileImage');

usersRouter.post('/', (req, res) => userController.signup(req,res));
usersRouter.patch('/', upload, authenticate, (req, res) => userController.upload(req,res));
usersRouter.post('/login', (req, res) => userController.login(req,res));

module.exports = usersRouter;
