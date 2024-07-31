var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var models = initModels(sequelize);