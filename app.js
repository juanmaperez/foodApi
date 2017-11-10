var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
const Event         = require('./models/event');
const User          = require('./models/user');
const cors          = require('cors')({ exposedHeaders: ['X-ResponseTime'] });
const schedule      = require('node-schedule');
const nodemailer    = require('nodemailer');
var mongoose        = require('mongoose');
const ejs           = require('ejs');
const dateformat    = require('dateformat');
        
require("dotenv").config();

/*if ( process.env.NODE_ENV === 'development' ) {
	const sookingWebUrl = process.env.WEBSITE;
} else {
	const sookingWebUrl= process.env.WEBSITE;
}*/
require("dotenv").config();
const sookingWebUrl = process.env.WEBSITE;

mongoose.connect('mongodb://localhost/foodDB', { useMongoClient: true, promiseLibrary: global.Promise });

var index           = require('./routes/index');
var auth            = require('./routes/auth');
var users           = require('./api/users');
var imageupload     = require('./api/imageupload');
var events          = require('./api/events');

var app = express();
console.log("starting my foodApi")
// view engine setup
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors);
app.options('*', cors);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', auth);

app.use('/api/users/', users);
app.use('/api/imageupload', imageupload);
app.use('/api/events', events);

/// CLEAR COMMENT TO SET CRON JOB ///

// var rule = new schedule.RecurrenceRule();
// rule.second = 1; // to set to minutes -> rule.minute = 60

// var scheduleCheckEvents = schedule.scheduleJob(rule, () => {
//   console.log("inside schedulecheckevents");
//   checkUpcomingEvents();
// });

function checkUpcomingEvents(){
  /******** CHECK IF ANY UPCOMING EVENTS WITHIN 24 HOURS FROM NOW  ********/
 
  let timeStampNow   = Date.now();

  let timeFrame24hFromNow   = timeStampNow + (24 * 60 * 60 * 1000 )
 
  Event.find( { "date" : {$gte:new Date( timeStampNow ), $lte:new Date( timeFrame24hFromNow )}})
    .populate('_guests')
    .exec(( err, events ) => {
        if(err){
            return next(err);

    }else{
      
        let emailData = {
            eventUrl    : "",
            eventTitle  : "",
            eventDate   : "",
            eventCity   : "",
            eventImage  : "",
            userName    : "",
            userEmail   : ""
        };

        let emails = [];
        
        if( events.length > 0){
        console.log("in if")
          for(let i = 0; i < events.length; i++ ){
            
              for(let j=0; j < events[i]._guests.length; j++ ){
               console.log("in loop")
                emails.push( {
                  eventUrl    : sookingWebUrl + "events/"+ events[i]._id,
                  eventTitle  : events[i].title,
                  eventData   : dateformat(events[i].date,'dddd, mmmm dS, yyyy, h:MM:ss TT'),
                  eventCity   : events[i].city,
                  eventImage  : events[i].image,
                  userName    : events[i]._guests[j].username,
                  userEmail   : events[i]._guests[j].email

                });
              
              }
            }

            loopThroughEmails(emails);
        }             
      }
  })

}


function loopThroughEmails(emails){

  for( let i= 0; i < emails.length; i++ ){
    
    let eventTitle  = emails[i].eventTitle;
    let eventData   = emails[i].eventData;
    let eventCity   = emails[i].eventCity;
    let eventImage  = emails[i].eventImage;
    let userName    = emails[i].userName;
    let userEmail   = emails[i].userEmail;
    let eventUrl    = emails[i].eventUrl;
    console.log("emails", emails)
    createMailWithUserData(eventTitle, eventData, eventCity, eventImage, userName, userEmail, eventUrl)
  }

}

//********* CREATE EVENT REMINDER MAIL **********//
function createMailWithUserData(eventTitle, eventData, eventCity, eventImage, userName, userEmail, eventUrl){
console.log("hi")
    ejs.renderFile( path.join(__dirname, '/public/mails/mail-reminder-event.ejs'), {
      eventTitle    : eventTitle,
      eventData     : eventData,
      eventCity     : eventCity,
      eventImage    : eventImage,
      userName      : userName,
      userEmail     : userEmail,
      eventUrl      : eventUrl
     
    }, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        sendSubscribeMail( data );
      }
    });
}


// USE THIS PACKAGE ONCE TO PROCESS ALL CSS STYLES INTO INLINE STYLES //
/*var originalSource = require('fs').readFileSync(path.join(__dirname , 'public/mails/mail-confirm-register.html'), 'utf8');

styliner.processHTML(originalSource)
        .then(function(processedSource) {
          console.log(processedSource);
          fs.writeFileSync(  processedSource , 'email-inline-css.html', (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
          });
            sendSubscribeMail( processedSource );
        });*/

function sendSubscribeMail(subscribemail){
    const transporter = nodemailer.createTransport({
      service:        'gmail',
      auth: {
        type:         'OAuth2',
        user:         "sentmailssocket@gmail.com",
        clientId:     "652901027611-a3rvc4c92vf07hoqjv6vht6hp5jtu7t9.apps.googleusercontent.com",
        clientSecret: "NRSUQmra8-A1WLW3ze8dnyYm",
        accessToken:  "ya29.GlvpBBJFCzV416Odgs4Iafe7kwyBYZhAEER3Uk9eAYIvBCaBbbPjoHqBNZuQwi5N5XpwdtgO7iKQlCik34IfBDCsSdqcsKpe5oLyA5qExudiyf34B5wqHHztNam3",
        refreshToken: "1/Nl0l7dyBp4eOvhZYzB61Krplk48MeryS2_O6XXKzSgA",
      },
    });

 
    
    var mailOptions = {
      from:    'sentmailssocket@gmail.com',     // here goes our email
      to:      'juanmaperezvar@gmail.com',    // here goes useremail
      subject: 'You have an upcoming event',
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



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
