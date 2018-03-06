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

//   var localPeerConnection;
//   localPeerConnection = new RTCPeerConnection(pcConfig);

//   var signallingServer;
//   var remotePeerConnection;
//   remotePeerConnection = new RTCPeerConnection(pcConfig);

//   var btnSend = document.getElementById('btn-send');
//   var btnVideoStop = document.getElementById('btn-video-stop');
//   var btnVideoStart = document.getElementById('btn-video-start');
//   var btnVideoJoin = document.getElementById('btn-video-join');
//   var localVideo = document.getElementById('local-video');
//   var remoteVideo = document.getElementById('remote-video');
//   var inputRoomName = document.getElementById('room-name');
//   var localStream;
//   var localIsCaller = false;
//   var remoteJoiner = false;
//   let remoteStream;
//   let roomReady = false;
//   let roomStarted = false;

//   //BUTTON EVENT HANDLERS
//   //STOP
//   btnVideoStop.onclick = function(e) {
//     e.preventDefault();

//     //KILL ALL CONNECTIONS
//     if (localPeerConnection != null) {
//       localPeerConnection.removeStream(localStream);
//       localPeerConnection.close();
//       // signallingServer.close();
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
//     peerConnection(room);
//   });

//   // SIGNALING SERVER HAS COME BACK TO NOTIFY LOCAL THAT SOMEONE WANTS TO JOIN
//   socket.on('joined', room => {
//     console.log('someone wanna join - client side. this peer instantiates the room');
//     // localIsCaller = false;
//     remoteJoiner = true;
//     peerConnection(room);
//     // socket.emit('message', room);
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
//   function peerConnection(room) {
//     // console.log('=======localIsCaller if local clicks then true=======', localIsCaller);
//     // console.log('=======remoteJoiner if remote clicks then true=======', remoteJoiner);

//     if (localIsCaller === true) {
//       // localPeerConnection = new RTCPeerConnection(pcConfig);

//       //OBTAIN USER MEDIA CONTENT
//       navigator.getUserMedia(
//         {
//           video: true,
//           audio: true
//         },
//         function(stream) {
//           //OBTAIN AND SAVE LOCAL STREAM
//           trace('Got stream, saving it now and starting RTC connect');
//           ///////must add before calling setRemoteDescription() because then it triggers 'addstream' event///////
//           localPeerConnection.addStream(stream);
//           localStream = stream;
//           //SHOW LOCAL VIDEO
//           localVideo.srcObject = stream;
//           //CAN START ONCE LOCAL VIDEO HAS BEEN OBTAINED
//           // establishRTCConnection(room);
//         }
//       );
//     }
//     if (remoteJoiner === true) {
//       //////REMOTE//////
//       // remotePeerConnection = new RTCPeerConnection(pcConfig);
//       navigator.getUserMedia(
//         {
//           video: true,
//           audio: true
//         },
//         function(stream) {
//           //OBTAIN AND SAVE LOCAL STREAM
//           trace('Got stream, saving it now and starting RTC connect');
//           ///////must add before calling setRemoteDescription() because then it triggers 'addstream' event///////
//           remotePeerConnection.addStream(stream);
//           remoteStream = stream;
//           console.log('=== REMOTE STREAM ===', remoteStream);
//           //SHOW LOCAL VIDEO
//           remoteVideo.srcObject = stream;
//         }
//       );
//       console.log('//////REMOTE//////', remoteJoiner);
//       socket.emit('message', room);
//     }
//   }

//   // //CREATE THE REMOTE PEER
//   // function connectRemote(room) {
//   //   remotePeerConnection = new RTCPeerConnection(pcConfig);
//   //   // if (remotePeerConnection) {
//   //   //   console.log('RTCPeer Connection for remote created');
//   //   // } else {
//   //   //   console.log('fail');
//   //   // }
//   //   // OBTAIN USER MEDIA CONTENT
//   //   navigator.getUserMedia(
//   //     {
//   //       video: true,
//   //       audio: true
//   //     },
//   //     function(stream) {
//   //       //OBTAIN AND SAVE LOCAL STREAM
//   //       trace('Got stream, saving it now and starting RTC connect');
//   //       ///////must add before calling setRemoteDescription() because then it triggers 'addstream' event///////
//   //       remotePeerConnection.addStream(stream);
//   //       remoteStream = stream;
//   //       //SHOW LOCAL VIDEO
//   //       remoteVideo.srcObject = stream;
//   //       // //READY TO JOIN REMOTE AND LOCAL
//   //       // establishRTCConnection(room);
//   //     }
//   //   );
//   //   // socket.emit('message', room); //NEED TO GO FROM REMOTE PEER TO LOCAL
//   // }

//   socket.on('message', room => {
//     // roomReady = true;
//     // console.log(localIsCaller); //THIS NEEDS TO BE TRUE
//     // if (roomReady && localIsCaller)
//     establishRTCConnection(room);
//   });

//   //////////////////ESTABLISH RTC CONNECTION AND CREATE SDP//////////////////////////
//   function establishRTCConnection(room) {
//     console.log('hit the establishRTCConnection fxn');
//     //INSTANTIATE SIGNALLING SERVER CONSTRUCTOR FOR ITS METHODS
//     signallingServer = new SignallingServer(room, serverIP);

//     console.log(
//       '#######++++++&&& localPeerConnection &&&%%%%%%%%%@@@@@@@',
//       localPeerConnection
//     );
//     console.log(
//       '#######++++++&&& remotePeerConnection &&&%%%%%%%%%@@@@@@@',
//       remotePeerConnection
//     );

//     ///////////a remote peer has joined room, initiate sdp exchange/////////
//     if (localIsCaller === true) {
//       ///////////set LOCAL description and send to REMOTE///////////
//       localPeerConnection
//         .createOffer()
//         .then(function(sessionDescription) {
//           return localPeerConnection.setLocalDescription(sessionDescription);
//         })
//         .then(function() {
//           signallingServer.sendSDP(
//             JSON.stringify({ desc: localPeerConnection.localDescription })
//           );
//           console.log('===== LOCAL CREATED OFFER AND SENT TO SIGNALING SERVER =====');
//         });

//       ////////////////////GET ICE CANDIDATES AND SEND THEM OVER//////////////////////////
//       //////////wont get called unless SDP has been exchanged////////////
//       localPeerConnection.onicecandidate = function(event) {
//         if (event.candidate) {
//           signallingServer.sendICECandidate(
//             JSON.stringify({ candidate: event.candidate })
//           );
//           console.log('===== LOCAL SENT CANDIDATES TO SIGNALING SERVER =====');
//         } else {
//           // All ICE candidates have been sent
//           console.log('===== LOCAL CANDIDATES ALREADY SENT TO SIGNALING SERVER =====');
//         }
//       };
//     }

//     if (remoteJoiner === false) {
//       ////////////////////WHEN RECEIVING ICE CANDIDATE//////////////////////////
//       // console.log('===== LOCAL IS CALLER - FALSE ===== ', localIsCaller);
//       // remotePeerConnection = new RTCPeerConnection(pcConfig);

//       // navigator.getUserMedia(
//       //   {
//       //     video: true,
//       //     audio: true
//       //   },
//       //   function(stream) {
//       //     //OBTAIN AND SAVE LOCAL STREAM
//       //     trace('Got stream, saving it now and starting RTC connect');
//       //     ///////must add before calling setRemoteDescription() because then it triggers 'addstream' event///////
//       //     remotePeerConnection.addStream(stream);
//       //     remoteStream = stream;
//       //     console.log('=== REMOTE STREAM ===', remoteStream);
//       //     //SHOW LOCAL VIDEO
//       //     remoteVideo.srcObject = stream;

//       //     // //READY TO JOIN REMOTE AND LOCAL
//       //     // establishRTCConnection(room);
//       //   }
//       // );

//       signallingServer.onReceiveICECandidate = function(candidate) {
//         let candidateObject = JSON.parse(candidate.candidate);
//         let receiveCandidate = candidateObject.candidate;

//         remotePeerConnection
//           .addIceCandidate(new RTCIceCandidate(receiveCandidate))
//           .then(() => {
//             console.log('=== REMOTE GOT CANDIDATES COMPLETE ===');
//             localPeerConnection
//               .addIceCandidate(new RTCIceCandidate(receiveCandidate))
//               .then(() => {
//                 // console.log('**** IM NOT BROKEN ****');
//                 console.log('=== LOCAL GOT CANDIDATES COMPLETE ===');
//               });
//           });
//       };

//       /////////get stream again///////////
//       // localPeerConnection.addStream(localStream);
//       // remotePeerConnection = new RTCPeerConnection(pcConfig);

//       //////////got sdp from remote/////////
//       signallingServer.onReceiveSdp = function(sdp) {
//         let sdpObject = JSON.parse(sdp.sdp);
//         let description = sdpObject.desc;

//         if (description.type === 'offer') {
//           console.log('===== OFFER =====', description);
//           remotePeerConnection
//             .setRemoteDescription(description) //RTCSessionDescription
//             .then(() => {
//               console.log('===== REMOTE RECEIVED LOCAL"S SDP =====');
//               remotePeerConnection.createAnswer().then(function(answer) {
//                 remotePeerConnection.setLocalDescription(answer).then(function() {
//                   signallingServer.sendANSWER(JSON.stringify({ desc: answer }));
//                   console.log(
//                     '===== REMOTE CREATED ANSWER, SET, AND SENT TO SIGNALING SERVER ====='
//                   );
//                 });
//               });
//             });
//         }
//       };

//       signallingServer.onReceiveAnswer = function(sdp) {
//         // console.log('remotePeerConnection', remotePeerConnection);
//         let sdpObject = JSON.parse(sdp.sdp);
//         let description = sdpObject.desc;

//         if (description.type === 'answer') {
//           console.log('===== ANSWER =====', description);
//           localPeerConnection.setRemoteDescription(description); //RTCSessionDescription
//           console.log('===== LOCAL RECEIVED REMOTE"S SDP =====');
//           console.log('===== THE END =====');
//         }
//         // ===================================
//       };
//     }
//     ////////////////////ALERT USER WHEN ROOM IS FULL//////////////////////////
//     // signallingServer.onRoomFull = function(room) {
//     //   window.alert('Room "' + room + '"" is full! Please join or create another room');
//     // };
//   }

//   // /////////////assign stream to DOM////////////////
//   // localPeerConnection.onaddstream = function(data) {
//   //   remoteVideo.srcObject = data.stream;
//   // };

//   function errorHandler(error) {
//     console.error('Something went wrong!');
//     console.error(error);
//   }

//   function trace(text) {
//     console.info(text);
//   }
// });
