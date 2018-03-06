// document.addEventListener('DOMContentLoaded', function() {
//   ////////////////////SOCKET CONNECTION//////////////////////////
//   let socket = io.connect('http://localhost:3000');

//   ('use strict');

//   var serverIP = 'http://localhost:3000';
//   // var serverIP = 'http://45.59.229.42/';

//   ////////////////////STUN & TURN SERVER//////////////////////////
//   var pcConfig = {
//     iceServers: [
//       { urls: 'stun:stun.services.mozilla.com' },
//       { urls: 'stun:stun.l.google.com:19302' },
//       {
//         urls: 'turn:numb.viagenie.ca',
//         credential: 'codesmith',
//         username: 'USER_1'
//       }
//     ]
//   };

//   var peerConnection;
//   // var signallingServer;
//   var signallingServer = new SignallingServer();

//   var remotePeerConnection;
//   var btnSend = document.getElementById('btn-send');
//   var btnVideoStop = document.getElementById('btn-video-stop');
//   var btnVideoStart = document.getElementById('btn-video-start');
//   var btnVideoJoin = document.getElementById('btn-video-join');
//   var localVideo = document.getElementById('local-video');
//   var remoteVideo = document.getElementById('remote-video');
//   var inputRoomName = document.getElementById('room-name');
//   var localStream, localIsCaller;
//   let remoteStream;
//   let roomReady = false;
//   let roomStarted = false;

//   //BUTTON EVENT HANDLERS
//   //STOP
//   btnVideoStop.onclick = function(e) {
//     e.preventDefault();

//     //KILL ALL CONNECTIONS
//     if (peerConnection != null) {
//       peerConnection.removeStream(localStream);
//       peerConnection.close();
//       signallingServer.close();
//       localVideo.src = '';
//       remoteVideo.src = '';
//     }

//     btnVideoStart.disabled = false;
//     btnVideoJoin.disabled = false;
//     btnVideoStop.disabled = true;
//   };

//   //START
//   btnVideoStart.onclick = function(e) {
//     e.preventDefault();
//     initConnection();
//   };

//   //JOIN
//   btnVideoJoin.onclick = function(e) {
//     e.preventDefault();
//     joinConnection();
//   };

//   //LOCAL'S CALL TO COMMUNICATE TO SOCKET TO CREATE ROOM
//   function initConnection() {
//     var room = inputRoomName.value;
//     if (room == undefined || room.length <= 0) {
//       alert('Please enter room name');
//       return;
//     }
//     //BUTTON SETTINGS
//     btnVideoStart.disabled = true;
//     btnVideoJoin.disabled = true;
//     btnVideoStop.disabled = false;
//     //COMMUNICATE TO SIGNALING SERVER TO CREATE ROOM
//     socket.emit('create', room);
//     console.log('client side');
//   }

//   //REMOTE'S CALL TO COMMUNICATE TO SOCKET TO JOIN ROOM
//   function joinConnection() {
//     var room = inputRoomName.value;
//     if (room == undefined || room.length <= 0) {
//       alert('Please enter room name');
//       return;
//     }
//     btnVideoStart.disabled = true;
//     btnVideoJoin.disabled = true;
//     btnVideoStop.disabled = false;
//     socket.emit('join', room);
//     console.log('join request on client side');
//   }

//   // SIGNALING SERVER HAS COME BACK AND CREATED ROOM
//   socket.on('created', room => {
//     console.log('created room; confirmed on client side');
//     localIsCaller = true;
//     start(room);
//   });

//   // SIGNALING SERVER HAS COME BACK TO NOTIFY LOCAL THAT SOMEONE WANTS TO JOIN
//   socket.on('joined', room => {
//     console.log('someone wanna join - client side. this peer instantiates the room');
//     localIsCaller = false;
//     // if(localIsCaller !== true)
//     start(room);

//     // connectRemote(room);
//   });

//   // SEND MSG TO SIGNAL SERVER TO SEND MSG TO REMOTE PEER
//   socket.on('instantiate local', room => {
//     console.log('we instantiated local', room);
//     checkAndStart();
//   });

//   //SDP CONSTRAINTS
//   var sdpConstraints = {
//     optional: [],
//     mandatory: {
//       OfferToReceiveVideo: true
//     }
//   };

//   //CREATE THE LOCAL PEER
//   function start(room) {
//     peerConnection = new RTCPeerConnection(pcConfig);
//     // signallingServer = new SignallingServer(room, serverIP);

//     peerConnection.onicecandidate = function(event) {
//       if (event.candidate) {
//         signallingServer.sendICECandidate(JSON.stringify({ candidate: event.candidate }));
//         console.log('sent all candidates to signaling server');
//       } else {
//         console.log('all ICE candidates have been sent');
//       }
//     };

//     peerConnection.onnegotiationneeded = function() {
//       peerConnection
//         .createOffer()
//         .then(function(offer) {
//           return peerConnection.setLocalDescription(offer);
//         })
//         .then(function() {
//           signallingServer.sendSDP(
//             JSON.stringify({ desc: peerConnection.localDescription })
//           );
//         });
//     };

//     peerConnection.ontrack = function(evt) {
//       if (!remoteVideo.srcObject) {
//         remoteVideo.srcObject = evt.streams[0];
//       }
//     };

//     //OBTAIN USER MEDIA CONTENT
//     navigator.mediaDevices
//       .getUserMedia({
//         video: true,
//         audio: true
//       })
//       .then(function(stream) {
//         localVideo.srcObject = stream;
//         peerConnection.addTrack(stream.getAudioTracks()[0], stream);
//         peerConnection.addTrack(stream.getVideoTracks()[0], stream);
//         // peerConnection.addStream(stream);
//         localStream = stream;
//       });

//     socket.emit('message', room);
//   }

//   socket.on('message', room => {
//     // roomReady = true;
//     // console.log(localIsCaller); //THIS NEEDS TO BE TRUE
//     // if (roomReady && localIsCaller)
//     establishRTCConnection(room);
//   });

//   //////////////////ESTABLISH RTC CONNECTION AND CREATE SDP//////////////////////////
//   function establishRTCConnection(room) {
//     // signallingServer = new SignallingServer(room, serverIP);

//     //////////got sdp from remote/////////
//     signallingServer.onReceiveSdp = function(sdp) {
//       let sdpObject = JSON.parse(sdp.sdp);
//       let description = sdpObject.desc;

//       if (description.type === 'offer') {
//         peerConnection
//           .setRemoteDescription(description) //RTCSessionDescription
//           .then(() => {
//             peerConnection.createAnswer().then(function(answer) {
//               peerConnection.setLocalDescription(answer).then(function() {
//                 signallingServer.sendANSWER(JSON.stringify({ desc: answer }));
//                 // console.log('***** answer*******', JSON.stringify({ desc: answer }));
//               });
//             });
//           });
//       }
//     };

//     signallingServer.onReceiveAnswer = function(sdp) {
//       let sdpObject = JSON.parse(sdp.sdp);
//       let description = sdpObject.desc;

//       if (description.type === 'answer') {
//         peerConnection.setRemoteDescription(description); //RTCSessionDescription
//       }
//     };

//     signallingServer.onReceiveICECandidate = function(candidate) {
//       let candidateObject = JSON.parse(candidate.candidate);
//       let receiveCandidate = candidateObject.candidate;

//       peerConnection.addIceCandidate(new RTCIceCandidate(receiveCandidate)).then(() => {
//         console.log('=== HEREEEEE ===');
//       });
//     };

//     ////////////////////ALERT USER WHEN ROOM IS FULL//////////////////////////
//     signallingServer.onRoomFull = function(room) {
//       window.alert('Room "' + room + '"" is full! Please join or create another room');
//     };
//   }

//   function errorHandler(error) {
//     console.error('Something went wrong!');
//     console.error(error);
//   }

//   function trace(text) {
//     console.info(text);
//   }
// });