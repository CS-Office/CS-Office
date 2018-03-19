import React, { Component } from 'react';

import io from 'socket.io-client';
// const SIGNALING_SERVER = 'https://webrtcweb.com:9559/';
// const SIGNALING_SERVER = 'http://localhost:5000';
class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: this.props.isAdmin,
      adminName: this.props.adminName,
      createdRoom: false,
    };
    this.pc = {};
    this.handleCreateRoom = this.handleCreateRoom.bind(this);
    this.startConnection = this.startConnection.bind(this);
    // this.initSocket = this.initSocket.bind(this);
    // this.setupNewBroadcastButtonClickHandler = this.setupNewBroadcastButtonClickHandler.bind(this);
    // this.captureUserMedia = this.captureUserMedia.bind(this);
    // // this.handleClick = this.handleClick.bind(this);
    // this.hideUnnecessaryStuff = this.hideUnnecessaryStuff.bind(this);
    // this.rotateInCircle = this.rotateInCircle.bind(this);
    const { socket } = this.props;
    // console.log('VIDEO socketttttt', socket);
  }

  // methods
  handleCreateRoom() {
    // console.log('state --', this.state);
    // console.log('in this function doe');
    const newState = Object.assign({}, this.state);
    newState.createdRoom = true;
    this.setState(newState);
    const adminName = this.state.adminName;
    // console.log('this is adminname: ', adminName);
    DetectRTC.load(() => {
      captureUserMedia(() => {
        const shared = 'video';
        broadcastUI.createRoom({
          roomName: admin,
          isAudio: shared === 'audio',
        });
      });
      hideUnnecessaryStuff();
    });
    this.startConnection();
  }

  startConnection() {
    // broadcast(config)
    // console.log('in startConnection');
    // openSocket: function(config) {
    //     config.channel = config.channel || location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
    //     console.log('config.channel:', config.channel);
    //     let sender = Math.round(Math.random() * 999999999) + 999999999;
    //     console.log('sender: ', sender)
    //     socket.emit('new-channel', {
    //         channel: config.channel,
    //         sender: sender
    //     });
    //     // var socket = io.connect(SIGNALING_SERVER + configg.channel);
    //     socket.channel = config.channel;
    //     // let socket = this.state.socket;
    //     this.props.socket.on('connect', function () {
    //         // if (config.callback) config.callback(socket);
    //         console.log('socket connected')
    //     });
    // socket.send = function (message) {
    //     socket.emit('message', {
    //         sender: sender,
    //         data: message
    //     });
    // };
    // socket.on('message', config.onmessage);
  }
  // this.initSocket();

  // let config = {
  //     // openSocket: function(config) {
  //     //     var SIGNALING_SERVER = 'https://webrtcweb.com:9559/';
  //     //     config.channel = config.channel || location.href.replace(/\/|:|#|%|\.|\[|\]/g, '');
  //     //     console.log('config.channel:', config.channel);
  //     //     var sender = Math.round(Math.random() * 999999999) + 999999999;
  //     //     console.log('sender: ', sender)
  //     //     io.connect(SIGNALING_SERVER).emit('new-channel', {
  //     //         channel: config.channel,
  //     //         sender: sender
  //     //     });
  //     //     var socket = io.connect(SIGNALING_SERVER + config.channel);
  //     //     socket.channel = config.channel;
  //     //     socket.on('connect', function () {
  //     //         if (config.callback) config.callback(socket);
  //     //         console.log('socket connected')
  //     //     });
  //     //     socket.send = function (message) {
  //     //         socket.emit('message', {
  //     //             sender: sender,
  //     //             data: message
  //     //         });
  //     //     };
  //     //     socket.on('message', config.onmessage);
  //     //     },
  //         onRemoteStream: function(mediaContainer) {
  //             mediaContainer.setAttribute('controls', true);
  //             videosContainer.insertBefore(mediaContainer, videosContainer.firstChild);
  //             mediaContainer.play();
  //             rotateInCircle(mediaContainer);
  //         },
  //         onRoomFound: function(room) {
  //             console.log('this is room.broadcaster', room.broadcaster)
  //             var alreadyExist = document.querySelector('button[data-broadcaster="' + room.broadcaster + '"]');
  //             console.log('alreadyExist val: ', alreadyExist)
  //             if (alreadyExist) return;
  //             if (typeof studentList === 'undefined')
  //                 studentList = document.body;
  //             var tr = document.createElement('tr');
  //             tr.innerHTML = '<td> Welcome! '+ '<strong>' + room.roomName + '</strong> is taking questions.</td>' +
  //                 '<td><button class="join">Join</button></td>';
  //                 console.log('this is firstChild: ', studentList.firstChild)
  //                 studentList.insertBefore(tr, studentList.firstChild);
  //             var joinRoomButton = tr.querySelector('.join');
  //             joinRoomButton.setAttribute('data-broadcaster', room.broadcaster);
  //             joinRoomButton.setAttribute('data-roomToken', room.broadcaster);
  //             joinRoomButton.onclick = function() {
  //                 this.disabled = true;
  //                 var broadcaster = this.getAttribute('data-broadcaster');
  //                 var roomToken = this.getAttribute('data-roomToken');
  //                 broadcastUI.joinRoom({
  //                     roomToken: roomToken,
  //                     joinUser: broadcaster
  //                 });
  //                 hideUnnecessaryStuff();
  //             };
  //         },
  //         onNewParticipant: function(numberOfViewers) {
  //             document.title = 'Viewers: ' + numberOfViewers;
  //         }
  //     };

  // captureUserMedia(callback) {
  //     var constraints = null;
  //     window.option = broadcastingOption ? broadcastingOption.value : '';
  //     var mediaContainer = document.createElement(option === 'Only Audio' ? 'audio' : 'video');
  //     mediaContainer.setAttribute('autoplay', true);
  //     mediaContainer.setAttribute('controls', true);
  //     videosContainer.insertBefore(mediaContainer, videosContainer.firstChild);
  //     var mediaConfig = {
  //         video: mediaContainer,
  //         onsuccess: function(stream) {
  //             config.attachStream = stream;
  //             callback && callback();

  //             mediaContainer.setAttribute('muted', true);
  //             rotateInCircle(mediaContainer);
  //         },
  //         onerror: function() {
  //                 alert('Access to webcam denied.');
  //         }
  //     };
  //     if (constraints) mediaConfig.constraints = constraints;
  //     getUserMedia(mediaConfig);
  // }
  // hideUnnecessaryStuff() {
  //     var visibleElements = document.getElementsByClassName('visible'),
  //         length = visibleElements.length;
  //     for (var i = 0; i < length; i++) {
  //         visibleElements[i].style.display = 'none';
  //     }
  // }
  // rotateInCircle(video) {
  //     video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
  //     setTimeout(function() {
  //         video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(360deg)';
  //     }, 1000);
  // }

  render() {
    const isAdmin = this.state.isAdmin;
    // console.log('isAdmin: ', isAdmin);
    const createdRoom = this.state.createdRoom;
    const disableBtn = createdRoom === true;
    const name = this.state.adminName;
    let loginMsg;
    let button;
    if (isAdmin && createdRoom === false) {
      // YOU ARE ADMIN AND HAVE NOT STARTED OFFICE HOURS
      loginMsg = 'You have not started office hours.';
      button = (
        <button id="setup-new-broadcast" className="setup" onClick={this.handleCreateRoom}>
          Start office hours
        </button>
      );
    }
    if (isAdmin && createdRoom) {
      // YOU ARE ADMIN AND HAVE STARTED OFFICE HOURS
      loginMsg = 'Office hours have started.';
      button = (
        <button id="end-broadcast" className="setup">
          End office hours
        </button>
      );
    }
    if (!isAdmin && !createdRoom) {
      // YOU ARE STUDENT AND OFFICE HOURS HAVE NOT STARTED
      loginMsg = 'Please wait. Office hours have not yet started.';
      button = null;
    }
    if (!isAdmin && createdRoom) {
      // YOU ARE STUDENT AND OFFICE HOURS HAVE STARTED
      loginMsg = 'Office hours have started.';
      button = (
        <button id="join-broadcast" className="setup">
          Join office hours
        </button>
      );
    }
    return (
      <div id="videoContainer">
        <h1>{loginMsg}</h1>
        {button}
      </div>
    );
  }
}
export default Video;
