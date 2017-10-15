const express = require('express');
const router = express.Router();

var jwt = require('jsonwebtoken');
var jwtOptions = require('../config/jwtoptions');
const passport   = require('../config/passport');

const User = require("../models/user");
//const FoodCategory = require("../models/foodcategory");
const Event = require('../models/event')

const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;


//Signup

router.post("/signup", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var email    = req.body.email;
    console.log("hola")
    if (!username || !password || !email) {
     res.status(400).json({ message: "All fields are mandatory!" });
      return;
    }
  
    User.findOne({ email }, "email", (err, user) => {
      if (user !== null) {
        res.status(400).json({ message: 'This email is already used' });
        return;
      }
  
      var salt     = bcrypt.genSaltSync(bcryptSalt);
      var hashPass = bcrypt.hashSync(password, salt);
  
      var newUser = User({
        username,
        password: hashPass,
        email,
      });
  
      newUser.save((err, user) => {
        if (err) {
          res.status(400).json({ message: err });
        } else {
          var payload = {id: user._id, user: user.username};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          return res.status(200).json({message: "ok", token: token, user: user});
            // res.status(200).json(user);
        }
      });
    });
  });



router.get("/token", passport.authenticate('jwt', { session: false }), (req, res, next) => {
	return res.json({ok:'ok'})
})



router.post("/login", function(req, res) {
    //Compruebo que hay usuario y password
    if(req.body.username && req.body.password){
      var username = req.body.username;
      var password = req.body.password;
    }
    // Compruebo qeu no hay vacío
    if (username === "" || password === "") {
      res.status(401).json({message:"fill up the fields"});
      return;
    }
    //Compruebo si hay usuario
    User.findOne({ "username": username }, (err, user)=> {
  
        if( ! user ){
          return res.status(401).json({message:"Username or password are incorrect"});
        } else {
        bcrypt.compare(password, user.password, function(err, isMatch) {
          console.log(isMatch);
          if (!isMatch) {
             return res.status(401).json({message:"Username or password are incorrect"});
          } else {
              console.log('user', user);
            var payload = {id: user._id, user: user.username};
            // uso el paquete jwt para generar el token a través del payload y las opciones del secreto
            // esto está en ../config/jwtoptions.js
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            console.log(token)
            return res.json({message: "Everything Ok", token: token, user: user});
          }
        });
      }
    })
  });
  

module.exports = router
