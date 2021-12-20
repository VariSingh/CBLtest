const express = require('express');
const pumpsRouter = express.Router();
const pumpController = require('../controllers/pump');
const { authPassword, authenticate } = require("../lib/auth");

pumpsRouter.get('/', (req, res) => pumpController.fetchNearestPumps(req,res));

module.exports = pumpsRouter;
