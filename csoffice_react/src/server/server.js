//  REQUIRED
const path = require('path');
const hat = require('hat');
const ws = require('ws');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//  FILES
const keys = require('../config/keys');
// require('./models/user');
// require('./passport');
// require('./routes/auth_routes')(app); //require returns functions from routes file and then immediately invokes the function with the app object

//  MONGOOSE
mongoose.connect(keys.mongoURI);
mongoose.connection.once('open', () => {
  console.log('===CONNECTED TO DATABASE===');
});

//  EXPRESS

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  PASSPORT
// const passport = require('passport');
// // initialize passport library to use it (create an instance?) in our app
// app.use(passport.initialize());
// // authenticate session for passport that we have created (cookieSession in our case)
// app.use(passport.session());

//  MIDDLEWARE

// COOKIE SESSION // ENCRYPTS COOKIE - SET NAME, AGE (24 HOURS), AND KEY
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'hi im a cookie',
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey],
}));

//  PATH FOR STATIC FILES
app.use(express.static(`${__dirname}./../../`));
app.use('/css', express.static(path.join(__dirname, './../client/css')));
app.use('/public', express.static(path.join(__dirname, './../client/public')));


app.options('*', function(req, res) {

  res.header('Access-Control-Allow-Origin', 'Accept, Accept-CH, Accept-Charset, Accept-Datetime, Accept-Encoding, Accept-Ext, Accept-Features, Accept-Language, Accept-Params, Accept-Ranges, Access-Control-Allow-Credentials, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Expose-Headers, Access-Control-Max-Age, Access-Control-Request-Headers, Access-Control-Request-Method, Age, Allow, Alternates, Authentication-Info, Authorization, C-Ext, C-Man, C-Opt, C-PEP, C-PEP-Info, CONNECT, Cache-Control, Compliance, Connection, Content-Base, Content-Disposition, Content-Encoding, Content-ID, Content-Language, Content-Length, Content-Location, Content-MD5, Content-Range, Content-Script-Type, Content-Security-Policy, Content-Style-Type, Content-Transfer-Encoding, Content-Type, Content-Version, Cookie, Cost, DAV, DELETE, DNT, DPR, Date, Default-Style, Delta-Base, Depth, Derived-From, Destination, Differential-ID, Digest, ETag, Expect, Expires, Ext, From, GET, GetProfile, HEAD, HTTP-date, Host, IM, If, If-Match, If-Modified-Since, If-None-Match, If-Range, If-Unmodified-Since, Keep-Alive, Label, Last-Event-ID, Last-Modified, Link, Location, Lock-Token, MIME-Version, Man, Max-Forwards, Media-Range, Message-ID, Meter, Negotiate, Non-Compliance, OPTION, OPTIONS, OWS, Opt, Optional, Ordering-Type, Origin, Overwrite, P3P, PEP, PICS-Label, POST, PUT, Pep-Info, Permanent, Position, Pragma, ProfileObject, Protocol, Protocol-Query, Protocol-Request, Proxy-Authenticate, Proxy-Authentication-Info, Proxy-Authorization, Proxy-Features, Proxy-Instruction, Public, RWS, Range, Referer, Refresh, Resolution-Hint, Resolver-Location, Retry-After, Safe, Sec-Websocket-Extensions, Sec-Websocket-Key, Sec-Websocket-Origin, Sec-Websocket-Protocol, Sec-Websocket-Version, Security-Scheme, Server, Set-Cookie, Set-Cookie2, SetProfile, SoapAction, Status, Status-URI, Strict-Transport-Security, SubOK, Subst, Surrogate-Capability, Surrogate-Control, TCN, TE, TRACE, Timeout, Title, Trailer, Transfer-Encoding, UA-Color, UA-Media, UA-Pixels, UA-Resolution, UA-Windowpixels, URI, Upgrade, User-Agent, Variant-Vary, Vary, Version, Via, Viewport-Width, WWW-Authenticate, Want-Digest, Warning, Width, X-Content-Duration, X-Content-Security-Policy, X-Content-Type-Options, X-CustomHeader, X-DNSPrefetch-Control, X-Forwarded-For, X-Forwarded-Port, X-Forwarded-Proto, X-Frame-Options, X-Modified, X-OTHER, X-PING, X-PINGOTHER, X-Powered-By, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', true); 
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  });

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });;

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, './../../index.html'));
});

const PORT = process.env.PORT || 3000;

//  SOCKETS
const server = require('http').Server(app);
const io = (module.exports.io = require('socket.io')(server));

const SocketManager = require('./SocketManager');

// const io = require('socket.io')(server);
// const socket = io(server);

io.on('connection', SocketManager);

// var socket = io.listen(server);
// socket.on('connection', function(client) {
//   console.log('connection established on server')
// })

server.listen(PORT, () => console.log('===SERVER LISTENING ON PORT 3000==='));
// module.exports = io;

// //////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////
// var wsServer = new ws.Server({ server: server });
// var peers = {};
// var waitingId = null;
// var count = 0;

// socket.on('connection', onconnection);

// //PEER IS WEBSOCKET AND WE ASSIGN IT AN ID AND PEERID
// function onconnection(peer) {
//   console.log('===SOCKET CONNECTED FROM SERVER===');
//   var send = peer.send;
//   peer.send = function() {
//     try {
//       send.apply(peer, arguments);
//     } catch (err) {}
//   };

//   peer.id = hat(); //CREATE UNIQUE ID 'THIS.ID'
//   peers[peer.id] = peer; //SET PEERS OBJECT WITH PEER.ID AND PEER (WEBSOCKET)
//   peer.on('close', onclose.bind(peer));
//   peer.on('error', onclose.bind(peer));
//   peer.on('message', onmessage.bind(peer));
//   count += 1;
//   broadcast(JSON.stringify({ type: 'count', data: count }));
// }

// function onclose() {
//   peers[this.id] = null;
//   if (this.id === waitingId) {
//     waitingId = null;
//   }
//   if (this.peerId) {
//     var peer = peers[this.peerId];
//     peer.peerId = null;
//     peer.send(JSON.stringify({ type: 'end' }), onsend);
//   }
//   count -= 1;
//   broadcast(JSON.stringify({ type: 'count', data: count }));
// }

// //DATA ENCAPSULATES WEBRTC OFFER, ANSWER, OR ICE CANDIDATE
// //'THIS' REFERS TO PEER1 (WEBSOCKET)
// function onmessage(data) {
//   // console.log('[' + this.id + ' receive] ' + data + '\n');
//   try {
//     var message = JSON.parse(data);
//   } catch (err) {
//     console.error('Discarding non-JSON message: ' + err);
//     return;
//   }

//   if (message.type === 'peer') {
//     if (waitingId && waitingId !== this.id) {
//       //IF WAITING ID IS TRUE AND DOES NOT EQUAL PEER1'S ID THEN ASSIGN WAITINGID TO peer
//       var peer = peers[waitingId];

//       this.peerId = peer.id;
//       peer.peerId = this.id;

//       //send peer1 as the initiator
//       this.send(
//         JSON.stringify({
//           type: 'peer',
//           data: {
//             initiator: true
//           }
//         }),
//         onsend
//       );

//       //send peer
//       peer.send(
//         JSON.stringify({
//           type: 'peer'
//         }),
//         onsend
//       );

//       waitingId = null;
//     } else {
//       waitingId = this.id;
//     }
//   } else if (message.type === 'signal') {
//     //SEND ICE CANDIDATE, OFFER, AND ANSWER (MESSAGE.DATA)
//     if (!this.peerId) return console.error('unexpected `signal` message');
//     var peer = peers[this.peerId];
//     peer.send(JSON.stringify({ type: 'signal', data: message.data }));
//     console.log('=== SENDING ICE, OFFER, OR ANSWER ===', message);
//   } else if (message.type === 'end') {
//     if (!this.peerId) return console.error('unexpected `end` message');
//     var peer = peers[this.peerId];
//     peer.peerId = null;
//     this.peerId = null;
//     peer.send(JSON.stringify({ type: 'end' }), onsend);
//   } else if (message.type === 'send code change') {
//     console.log('=== ON CODE CHANGE MESSAGE SERVER.JS=== ', message);

//     wsServer.clients.forEach(function each(client) {
//       if (client !== peer) {
//         client.send(JSON.stringify({ type: 'send code change', data: message.data }));
//       }
//     });
//   } else {
//     peer.send(message, onsend);
//     console.error('unknown message `type` ' + message.type);
//   }
// }

// function onsend(err) {
//   if (err) console.error(err.stack || err.message || err);
// }

// function broadcast(message) {
//   for (var id in peers) {
//     var peer = peers[id];
//     if (peer) {
//       peer.send(message);
//     }
//   }
// }
