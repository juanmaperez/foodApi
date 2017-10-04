const express = require('express');
const router = express.Router();

var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtoptions');
const passport   = require('../config/passport');

const User = require("../models/user");

const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;