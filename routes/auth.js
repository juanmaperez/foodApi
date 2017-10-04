const express = require('express');
const router = express.Router();

var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtoptions');
const passport   = require('../config/passport');

const User = require("../models/user");
const FoodCategory = ("../models/foodcategory");
const Event = ('../models/event')

const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;


//Signup

router.post("/signup", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var email    = req.body.email;
    var age      = req.body.age;
    var description = req.body.description;
    var image = req.body.image;
    
  
    if (!username || !password) {
      res.status(400).json({ message: "Provide username and password" });
      return;
    }
  
    User.findOne({ username }, "username", (err, user) => {
      if (user !== null) {
        res.status(400).json({ message: 'user exist' });
        return;
      }
  
      var salt     = bcrypt.genSaltSync(bcryptSalt);
      var hashPass = bcrypt.hashSync(password, salt);
  
      var newUser = User({
        username,
        password: hashPass
      });
  
      newUser.save((err, user) => {
        if (err) {
          res.status(400).json({ message: err });
        } else {
          var payload = {id: user._id, user: user.username};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.status(200).json({message: "ok", token: token, user: user});
            // res.status(200).json(user);
        }
      });
    });
  });