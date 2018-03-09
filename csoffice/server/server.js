//////////////////REQUIRED/////////////////
const path = require('path');
const hat = require('hat');
var ws = require('ws');
var http = require('http');

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
app.use('/public', express.static(path.join(__dirname, '../client/public')));

require('./routes/authRoutes')(app); //require returns functions from routes file and then immediately invokes the function with the app object

const PORT = process.env.PORT || 3000;
let server = app.listen(PORT, () => console.log('===SERVER LISTENING ON PORT 3000==='));

//////////////////SOCKET/////////////////
var wsServer = new ws.Server({ server: server });

var peers = {};
var waitingId = null;
var count = 0;

wsServer.on('connection', onconnection);

//PEER IS WEBSOCKET AND WE ASSIGN IT AN ID AND PEERID
function onconnection(peer) {
  /////////////VIDEO-CHAT////////////////
  console.log('===SOCKET CONNECTED FROM SERVER===');
  var send = peer.send;
  peer.send = function() {
    try {
      send.apply(peer, arguments);
    } catch (err) {}
  };

  peer.id = hat(); //CREATE UNIQUE ID 'THIS.ID'
  peers[peer.id] = peer; //SET PEERS OBJECT WITH PEER.ID AND PEER (WEBSOCKET)
  peer.on('close', onclose.bind(peer));
  peer.on('error', onclose.bind(peer));
  peer.on('message', onmessage.bind(peer));
  count += 1;
  broadcast(JSON.stringify({ type: 'count', data: count }));
}

function onclose() {
  peers[this.id] = null;
  if (this.id === waitingId) {
    waitingId = null;
  }
  if (this.peerId) {
    var peer = peers[this.peerId];
    peer.peerId = null;
    peer.send(JSON.stringify({ type: 'end' }), onsend);
  }
  count -= 1;
  broadcast(JSON.stringify({ type: 'count', data: count }));
}

//DATA ENCAPSULATES WEBRTC OFFER, ANSWER, OR ICE CANDIDATE
//'THIS' REFERS TO PEER1 (WEBSOCKET)
function onmessage(data) {
  // console.log('[' + this.id + ' receive] ' + data + '\n');
  try {
    var message = JSON.parse(data);
  } catch (err) {
    console.error('Discarding non-JSON message: ' + err);
    return;
  }

  if (message.type === 'peer') {
    if (waitingId && waitingId !== this.id) {
      //IF WAITING ID IS TRUE AND DOES NOT EQUAL PEER1'S ID THEN ASSIGN WAITINGID TO PEER2
      var peer2 = peers[waitingId];

      this.peerId = peer2.id;
      peer2.peerId = this.id;

      //send peer1 as the initiator
      this.send(
        JSON.stringify({
          type: 'peer',
          data: {
            initiator: true
          }
        }),
        onsend
      );

      //send peer
      peer2.send(
        JSON.stringify({
          type: 'peer'
        }),
        onsend
      );

      waitingId = null;
    } else {
      waitingId = this.id;
    }
  } else if (message.type === 'signal') {
    //SEND ICE CANDIDATE, OFFER, AND ANSWER (MESSAGE.DATA)
    if (!this.peerId) return console.error('unexpected `signal` message');
    var peer2 = peers[this.peerId];
    peer2.send(JSON.stringify({ type: 'signal', data: message.data }));
    console.log('=== SENDING ICE, OFFER, OR ANSWER ===');
  } else if (message.type === 'end') {
    if (!this.peerId) return console.error('unexpected `end` message');
    var peer2 = peers[this.peerId];
    peer2.peerId = null;
    this.peerId = null;
    peer2.send(JSON.stringify({ type: 'end' }), onsend);
  } else if (message.type === 'send code change') {
    console.log('=== ON CODE CHANGE MESSAGE SERVER.JS=== ', message);

    wsServer.clients.forEach(function each(client) {
      if (client !== peer) {
        client.send(JSON.stringify({ type: 'send code change', data: message.data }));
      }
    });
  } else {
    peer.send(message, onsend);
    console.error('unknown message `type` ' + message.type);
  }
}

function onsend(err) {
  if (err) console.error(err.stack || err.message || err);
}

function broadcast(message) {
  for (var id in peers) {
    var peer = peers[id];
    if (peer) {
      peer.send(message);
    }
  }
}
