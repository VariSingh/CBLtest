const express = require('express');
const bookingRouter = express.Router();
const bookingController = require('../controllers/booking');
const { authenticate } = require("../lib/auth");
//const multer = require('multer');
// var storage = multer.memoryStorage({
//     destination: function (req, file, callback) {
//         callback(null, '');
//     }
// });

//var upload = multer({ storage: storage }).single('profileImage');

//usersRouter.post('/', (req, res) => userController.signup(req,res));
//usersRouter.post('/login', (req, res) => userController.login(req,res));

bookingRouter.post('/',authenticate, (req, res) => bookingController.create(req,res));
module.exports = bookingRouter;
