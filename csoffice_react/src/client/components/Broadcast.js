import io from 'socket.io-client';
// require our websocket library
// var WebSocketServer = require('ws').Server;

// //creating a websocket server at port 9090
// var wss = new WebSocketServer({port: 9090});

const Broadcast = function(props) {
  console.log('in hereeeee');
  //  broadcast(confPig);

  const onMessageCallback = {};
  let htmlElement;
  const onMessageCallbacks = {};
  const currentUserUUID = Math.round(Math.random() * 60535) + 5000;
  const socketio = io.connect('http://localhost:3000/');

  socketio.on('message', (data) => {
    if (data.sender == currentUserUUID) return;

    if (onMessageCallbacks[data.channel]) {
      onMessageCallbacks[data.channel](data.message);
    }
  });

  const config = {
    openSocket(config) {
      const channel = config.channel || 'main-channel';
      onMessageCallbacks[channel] = config.onmessage;
      if (config.onopen) setTimeout(config.onopen, 200);
      return {
        send(message) {
          socketio.emit('message', {
            sender: currentUserUUID,
            channel,
            message,
          });
        },
        channel,
      };
    },

    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    onRemoteStream(htmlElement) {
      console.log('in on RemoteStream and this is the ', htmlElement);
      htmlElement.setAttribute('controls', true);
      videosContainer.insertBefore(htmlElement, videosContainer.firstChild);
      htmlElement.play();
      rotateInCircle(htmlElement);
    },
    onRoomFound(room) {
      console.log('in on RoomFound');
      const alreadyExist = document.querySelector(`button[data-broadcaster="${room.broadcaster}"]`);
      if (alreadyExist) return;
      if (typeof roomsList === 'undefined') roomsList = document.body;
      const tr = document.createElement('tr');
      tr.className = 'room-row';
      tr.innerHTML =
        `<td><strong>${room.roomName}</strong> has started a room</td>` +
        '<td class="join-button-td"><button class="join">Join</button></td>';
      roomsList.insertBefore(tr, roomsList.firstChild);
      const joinRoomButton = tr.querySelector('.join');
      joinRoomButton.setAttribute('data-broadcaster', room.broadcaster);
      joinRoomButton.setAttribute('data-roomToken', room.broadcaster);
      joinRoomButton.onclick = function() {
        this.disabled = true;
        const video = document.querySelector('#video-draggable');
        video.classList.toggle('hover');
        const broadcaster = this.getAttribute('data-broadcaster');
        const roomToken = this.getAttribute('data-roomToken');
        broadcastUI.joinRoom({
          roomToken,
          joinUser: broadcaster,
        });
        hideUnnecessaryStuff();
      };
    },
    onNewParticipant(numberOfViewers) {
      document.title = `Viewers: ${numberOfViewers}`;
    },
  };
  function setupNewBroadcastButtonClickHandler() {
    document.getElementById('broadcast-name').disabled = true;
    document.getElementById('setup-new-broadcast').disabled = true;
    DetectRTC.load(() => {
      captureUserMedia(() => {
        let shared = 'video';
        if (window.option == 'Only Audio') {
          shared = 'audio';
        }
        if (window.option == 'Screen') {
          shared = 'screen';
        }
        broadcastUI.createRoom({
          roomName: (document.getElementById('broadcast-name') || {}).value || 'Anonymous',
          isAudio: shared === 'audio',
        });
      });
      hideUnnecessaryStuff();
    });
  }
  function captureUserMedia(callback) {
    let constraints = null;
    window.option = broadcastingOption ? broadcastingOption.value : '';
    if (option === 'Only Audio') {
      constraints = {
        audio: true,
        video: false,
      };
      if (DetectRTC.hasMicrophone !== true) {
        alert('DetectRTC library is unable to find microphone; maybe you denied microphone access once and it is still denied or maybe microphone device is not attached to your system or another app is using same microphone.');
      }
    }
    if (option === 'Screen') {
      const video_constraints = {
        mandatory: {
          chromeMediaSource: 'screen',
        },
        optional: [],
      };
      constraints = {
        audio: false,
        video: video_constraints,
      };
      if (DetectRTC.isScreenCapturingSupported !== true) {
        alert('DetectRTC library is unable to find screen capturing support. You MUST run chrome with command line flag "chrome --enable-usermedia-screen-capturing"');
      }
    }
    if (option != 'Only Audio' && option != 'Screen' && DetectRTC.hasWebcam !== true) {
      alert('DetectRTC library is unable to find webcam; maybe you denied webcam access once and it is still denied or maybe webcam device is not attached to your system or another app is using same webcam.');
    }

    htmlElement = document.createElement(option === 'Only Audio' ? 'audio' : 'video');
    htmlElement.setAttribute('autoplay', true);
    htmlElement.setAttribute('controls', true);
    console.log(htmlElement, 'this was hte htmlElem');
    videosContainer.insertBefore(htmlElement, videosContainer.firstChild);
    const mediaConfig = {
      video: htmlElement,
      onsuccess(stream) {
        console.log('onsuccess for media');

        config.attachStream = stream;
        callback && callback();
        htmlElement.setAttribute('muted', true);
        rotateInCircle(htmlElement);
      },
      onerror() {
        if (option === 'Only Audio') alert('unable to get access to your microphone');
        else if (option === 'Screen') {
          if (location.protocol === 'http:') alert('Please test this WebRTC experiment on HTTPS.');
          else {
            alert('Screen capturing is either denied or not supported. Are you enabled flag: "Enable screen capture support in getUserMedia"?');
          }
        } else alert('unable to get access to your webcam');
      },
    };
    if (constraints) mediaConfig.constraints = constraints;
    getUserMedia(mediaConfig);
  }
  var broadcastUI = broadcast(config);
  /* UI specific */
  var videosContainer = document.getElementById('videos-container') || document.body;
  const setupNewBroadcast = document.getElementById('setup-new-broadcast');
  var roomsList = document.getElementById('rooms-list');
  var broadcastingOption = document.getElementById('broadcasting-option');
  if (setupNewBroadcast) setupNewBroadcast.onclick = setupNewBroadcastButtonClickHandler;
  function hideUnnecessaryStuff() {
    let visibleElements = document.getElementsByClassName('visible'),
      length = visibleElements.length;
    for (let i = 0; i < length; i++) {
      visibleElements[i].style.display = 'none';
    }
  }
  function rotateInCircle(video) {
    video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
    setTimeout(() => {
      video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(360deg)';
    }, 1000);
  }
};

export default Broadcast;