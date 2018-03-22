

             import io from 'socket.io-client';
                        //require our websocket library 
            // var WebSocketServer = require('ws').Server; 

            // //creating a websocket server at port 9090 
            // var wss = new WebSocketServer({port: 9090}); 

             const Broadcast = function(props) {
             
                 console.log('in hereeeee')
                //  broadcast(config);

                var onMessageCallback = {};
                let htmlElement;
                var onMessageCallbacks = {};
                var currentUserUUID = Math.round(Math.random() * 60535) + 5000;
                var socketio = io.connect('http://localhost:3000/');

                socketio.on('message', function(data) {
                    console.log('socketio in on msg: ', socketio)
                    if(data.sender == currentUserUUID) return;

                    if (onMessageCallbacks[data.channel]) {
                        onMessageCallbacks[data.channel](data.message);
                    };
                });

                var config = {
                    openSocket: function (config) {
                        var channel = config.channel || 'main-channel';
                        onMessageCallbacks[channel] = config.onmessage;
                        if (config.onopen) setTimeout(config.onopen, 200);
                        return {
                            send: function (message) {
                                socketio.emit('message', {
                                    sender: currentUserUUID,
                                    channel: channel,
                                    message: message
                                });
                            },
                            channel: channel
                        };
                    },
        
              /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    onRemoteStream: function(htmlElement) {
                      console.log('in on RemoteStream and this is the ', htmlElement)
                        htmlElement.setAttribute('controls', true);
                        videosContainer.insertBefore(htmlElement, videosContainer.firstChild);
                        htmlElement.play();
                        rotateInCircle(htmlElement);
                    },
                    onRoomFound: function(room) {
                      console.log('in on RoomFound')
                        var alreadyExist = document.querySelector('button[data-broadcaster="' + room.broadcaster + '"]');
                        if (alreadyExist) return;
                        if (typeof roomsList === 'undefined') roomsList = document.body;
                        var tr = document.createElement('tr');
                        tr.innerHTML = '<td><strong>' + room.roomName + '</strong> is now taking questions!</td>' +
                            '<td><button class="join">Join</button></td>';
                        roomsList.insertBefore(tr, roomsList.firstChild);
                        var joinRoomButton = tr.querySelector('.join');
                        joinRoomButton.setAttribute('data-broadcaster', room.broadcaster);
                        joinRoomButton.setAttribute('data-roomToken', room.broadcaster);
                        joinRoomButton.onclick = function() {
                            this.disabled = true;
                            var broadcaster = this.getAttribute('data-broadcaster');
                            var roomToken = this.getAttribute('data-roomToken');
                            broadcastUI.joinRoom({
                                roomToken: roomToken,
                                joinUser: broadcaster
                            });
                            hideUnnecessaryStuff();
                        };
                    },
                    onNewParticipant: function(numberOfViewers) {
                        props.numberOfViewers = numberOfViewers;
                        let div = document.getElementById('vidHeader');
                        if (numberOfViewers === 1) {
                            div.innerHTML = 'There is currently <strong> 1 </strong> viewer.'
                        } else {
                        div.innerHTML = 'There are currently <strong>' + numberOfViewers + '</strong> viewers.'
                        }
                        // document.title = 'Viewers: ' + numberOfViewers;
                    }
                };
                // function changeBtnTextHandler() {
                //     let startBtn = document.getElementById('setup-new-broadcast')
                //     startBtn.value = 'Office hours in session';
                //     startBtn.disabled = true;
                // }
                function setupNewBroadcastButtonClickHandler() {
                    document.getElementById('setup-new-broadcast').disabled = true;
                    document.getElementById('vidWelcomeHeader').innerHTML = 'Office hours in session';
                    // document.getElementById('broadcast-name').disabled = true;
                    // let startBtn = document.getElementById('setup-new-broadcast')
                    // startBtn.value = 'Office hours in session';
                    // startBtn.disabled = true;

                    DetectRTC.load(function() {
                        captureUserMedia(function() {
                            var shared = 'video';
                            if (window.option == 'Only Audio') {
                                shared = 'audio';
                            }
                            if (window.option == 'Screen') {
                                shared = 'screen';
                            }
                            broadcastUI.createRoom({
                                roomName: props.adminName || 'Codesmith Fellow',
                                isAudio: shared === 'audio'
                            });
                        });
                        hideUnnecessaryStuff();
                    });
                }
                function endBroadcastClickHandler() {
                    console.log('this is socketio: ', socketio)
                    socketio.disconnect();
                }
                function captureUserMedia(callback) {
                    var constraints = null;
                    window.option = broadcastingOption ? broadcastingOption.value : '';
                    if (option === 'Only Audio') {
                        constraints = {
                            audio: true,
                            video: false
                        };
                        if(DetectRTC.hasMicrophone !== true) {
                            alert('DetectRTC library is unable to find microphone; maybe you denied microphone access once and it is still denied or maybe microphone device is not attached to your system or another app is using same microphone.');
                        }
                    }
                    if (option === 'Screen') {
                        var video_constraints = {
                            mandatory: {
                                chromeMediaSource: 'screen'
                            },
                            optional: []
                        };
                        constraints = {
                            audio: false,
                            video: video_constraints
                        };
                        if(DetectRTC.isScreenCapturingSupported !== true) {
                           alert('DetectRTC library is unable to find screen capturing support. You MUST run chrome with command line flag "chrome --enable-usermedia-screen-capturing"');
                        }
                    }
                    if (option != 'Only Audio' && option != 'Screen' && DetectRTC.hasWebcam !== true) {
                        alert('DetectRTC library is unable to find webcam; maybe you denied webcam access once and it is still denied or maybe webcam device is not attached to your system or another app is using same webcam.');
                    }

                    htmlElement = document.createElement(option === 'Only Audio' ? 'audio' : 'video');
                    htmlElement.setAttribute('autoplay', true);
                    htmlElement.setAttribute('controls', true);
                    console.log (htmlElement, 'this was the htmlElem')
                    videosContainer.insertBefore(htmlElement, videosContainer.firstChild);
                    var mediaConfig = {
                        video: htmlElement,
                        onsuccess: function(stream) {
                            console.log('onsuccess for media')
                            config.attachStream = stream;
                            callback && callback();
                            htmlElement.setAttribute('muted', true);
                            rotateInCircle(htmlElement);

                        },
                        onerror: function() {
                            if (option === 'Only Audio') alert('unable to get access to your microphone');
                            else if (option === 'Screen') {
                                if (location.protocol === 'http:') alert('Please test this WebRTC experiment on HTTPS.');
                                else alert('Screen capturing is either denied or not supported. Are you enabled flag: "Enable screen capture support in getUserMedia"?');
                            } else alert('unable to get access to your webcam');
                        }
                    };
                    if (constraints) mediaConfig.constraints = constraints;
                    getUserMedia(mediaConfig);

                }
                var broadcastUI = broadcast(config);
                /* UI specific */
                var videosContainer = document.getElementById('videos-container') || document.body;
                var setupNewBroadcast = document.getElementById('setup-new-broadcast');
                var roomsList = document.getElementById('rooms-list');
                var broadcastingOption = document.getElementById('broadcasting-option');
                var endBroadcast = document.getElementById('end-broadcast');
          
                if (setupNewBroadcast) setupNewBroadcast.onclick = setupNewBroadcastButtonClickHandler;
                if (endBroadcast) endBroadcast.onclick = endBroadcastClickHandler;
                function hideUnnecessaryStuff() {
                    var visibleElements = document.getElementsByClassName('visible'),
                        length = visibleElements.length;
                    for (var i = 0; i < length; i++) {
                        visibleElements[i].style.display = 'none';
                    }
                }
                function rotateInCircle(video) {
                    video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(0deg)';
                    setTimeout(function() {
                        video.style[navigator.mozGetUserMedia ? 'transform' : '-webkit-transform'] = 'rotate(360deg)';
                    }, 1000);
                }
            };

            export default Broadcast;