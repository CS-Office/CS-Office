//////////////////REQUIRED/////////////////
const path = require('path');
var os = require('os');

//////////////////FILES/////////////////
require('./models/user');
require('./passport');
const keys = require('../config/keys');

//////////////////MONGOOSE/////////////////
const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI);
mongoose.connection.once('open', () => {
  console.log('===CONNECTED TO DATABASE===');
});

//////////////////EXPRESS/////////////////
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//////////////////PASSPORT/////////////////
const passport = require('passport');
// initialize passport library to use it (create an instance?) in our app
app.use(passport.initialize());
// authenticate session for passport that we have created (cookieSession in our case)
app.use(passport.session());

//////////////////MIDDLEWARE/////////////////
// COOKIE SESSION // ENCRYPTS COOKIE - SET NAME, AGE (24 HOURS), AND KEY
const cookieSession = require('cookie-session');
app.use(
  cookieSession({
    name: 'hi im a cookie',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

//////////////////PATH FOR STATIC FILES/////////////////
app.use('/css', express.static(path.join(__dirname, './../client/css')));
app.use('/js', express.static(path.join(__dirname, './../js')));

require('./routes/authRoutes')(app); //require returns functions from routes file and then immediately invokes the function with the app object

const PORT = process.env.PORT || 3000;
let server = app.listen(PORT, () => console.log('===SERVER LISTENING ON PORT 3000==='));

//////////////////SOCKET.IO/////////////////
let socket = require('socket.io');
let io = new socket(server);

//////////////////SOCKET CONNECTION/////////////////
let users = 0;

io.on('connection', function(socket) {
  console.log('===SOCKET CONNECTED FROM SERVER.JS===');

  socket.on('create', room => {
    //FIRST CLIENT JOINING
    if (!users) {
      socket.join(room);
      users++;
      socket.emit('created', room);
      console.log('room created');
    }
  });

  socket.on('join', room => {
    //REMOTE CLIENT(S) JOINING
    if (users) {
      socket.join(room);
      users++;
      socket.emit('joined', room);
      console.log('someone wants to join - server');
    }
  });

  socket.on('msg', room => {
    //REMOTE CLIENT(S) JOINING
    //this is still remote peer
    socket.broadcast.emit('message', room);
    // socket.emit('instantiate local', room);
    console.log('need msg to go from remote to local');
  });

  // when received ice candidate, broadcast sdp to other user
  socket.on('ice candidate', function(data) {
    // console.log('Received ICE candidate from ' + socket.id + ' ' + data.candidate);
    // socket.to(data.room).emit('ice candidate received', data.candidate);
    console.log('=== received ICE candidate data === ', data.candidate);
    socket.emit('ice candidate received', data);
  });

  //////////////////SEND SDP/////////////////
  socket.on('sdp', function(data) {
    // console.log('%%%%%%%%%%%% ', data);
    // console.log('=== RECEIVED SDP FROM === ' + socket.id);
    socket.emit('sdp received', data);
    // socket.to(data.room).emit('sdp received', data.sdp);
  });

  socket.on('answer', function(data) {
    console.log('===INSIDE SERVER.JS ANSWER===');
    socket.emit('answer received', data);
  });

  //////////////////GOODBYE/////////////////
  socket.on('goodbye', function(room) {
    console.log('=== RECEIVED GOODBYE ===');
  });

  //////////////////MESSAGE/////////////////
  socket.on('message', function(message) {
    console.log('Client said: ', message);
    // for a real app, would be room-only (not broadcast)
    socket.broadcast.emit('message', message);
  });
});
