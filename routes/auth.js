const express         = require('express');
const router          = express.Router();

var jwt               = require('jsonwebtoken');
var jwtOptions        = require('../config/jwtoptions');
const passport        = require('../config/passport');
var path              = require('path');
const User            = require("../models/user");
const FoodCategory    = ("../models/foodcategory");
const Event           = ('../models/event')

const bcrypt          = require("bcrypt");
const bcryptSalt      = 10;

const nodemailer      = require("nodemailer");

const ejs             = require('ejs');         

require("dotenv").config();

const sookingWebUrl = process.env.WEBSITE;

/*if ( process.env.NODE_ENV === 'development' ) {
	const sookingWebUrl = process.env.WEBSITE;
} else {
	const sookingWebUrl= process.env.WEBSITE;
}*/


//Signup

router.post("/signup", (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
    var email    = req.body.email;
   
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
      
        username          : username,
        password          : hashPass,
        email             : email,
        birthdate         : undefined,
        description       : "",
        image             : "",
        address           : "",
        address_lat       : 0,
        address_lng       : 0,
        city              : "",
        host              : false,
        optIN             : false
  
      });
      
  
      newUser.save((err, user) => {
        if (err) {
          res.status(400).json({ message: err });
        } else {
          var payload = {id: user._id, user: user.username};
          var token = jwt.sign(payload, jwtOptions.secretOrKey);
          createMailWithUserData( user.username, user.email );
          return res.status(200).json({ message: "ok", token: token, user: user });
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
          
          if (!isMatch) {
             return res.status(401).json({message:"Username or password are incorrect"});
          } else {
              
            var payload = {id: user._id, user: user.username};
            // uso el paquete jwt para generar el token a través del payload y las opciones del secreto
            // esto está en ../config/jwtoptions.js
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            console.log( "token",token );
            return res.json({ message: "Everything Ok", token: token, user: user });
          }
        });
      }
    })
  });
  

  //*******************SEND USER SIGNUP CONFIRMATION MAIL *************************//

     function createMailWithUserData(username, usermail){
          console.log("inside createMail");
          ejs.renderFile( path.join(__dirname, '../public/mails/mail-confirm-register.ejs'), {
            
            username: username,
            email   : usermail,
            url     : sookingWebUrl + "profile"

          }, function (err, data) {
            if (err) {
              console.log(err);
            } else {
              sendSubscribeConfirmationMail( data, usermail );
            }
          });
      }
      
      function sendSubscribeConfirmationMail(subscribemail, usermail){
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: 'sentmailssocket@gmail.com',
              clientId: "652901027611-a3rvc4c92vf07hoqjv6vht6hp5jtu7t9.apps.googleusercontent.com",
              clientSecret: "NRSUQmra8-A1WLW3ze8dnyYm",
              accessToken: "ya29.GlvpBBJFCzV416Odgs4Iafe7kwyBYZhAEER3Uk9eAYIvBCaBbbPjoHqBNZuQwi5N5XpwdtgO7iKQlCik34IfBDCsSdqcsKpe5oLyA5qExudiyf34B5wqHHztNam3",
              refreshToken: "1/Nl0l7dyBp4eOvhZYzB61Krplk48MeryS2_O6XXKzSgA",
            },
          });
      
          var mailOptions = {
            from:    'Social Cooking <sentmailssocket@gmail.com>',
            to:      'giulia.gottschalk@gmail.com',
            subject: 'Social Cooking Signup Confirmation',
            html:     subscribemail
          }
          
          transporter.sendMail( mailOptions, function( err, res ) {
            if(err){
            console.log('error')
            }else{
              console.log('email sent');
            }
      
          });
      
      }


module.exports = router;
