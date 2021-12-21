const express = require('express');
const pumpsRouter = express.Router();
const pumpController = require('../controllers/pump');
const { authenticate } = require("../lib/auth");

pumpsRouter.get('/',authenticate, (req, res) => pumpController.fetchNearestPumps(req,res));

module.exports = pumpsRouter;
