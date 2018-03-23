import React, { Component } from 'react';
import Broadcast from './Broadcast';
import { Button, Glyphicon } from 'react-bootstrap';
// import io from

// import io from './../../server/server.js';
// import <script src="https://cdn.webrtc-experiment.com/DetectRTC.js"></script>
// const SIGNALING_SERVER = 'https://webrtcweb.com:9559/';
// const SIGNALING_SERVER = 'http://localhost:5000';

function dragElement(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById('video-draggable')) {
    /* if present, the header is where you move the DIV from: */
    document.getElementById('video-draggable').onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV: */
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
    elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
  }

  function closeDragElement() {
    /* stop moving when mouse button is released: */
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: this.props.isAdmin,
      adminName: this.props.adminName,
      socket: this.props.socket,
      createdRoom: false,
    };
  }

  componentDidMount() {
    console.log('in here');
    if (this.state.isAdmin) {
      const video = Broadcast(this.state);
    }
    const div = document.querySelector('#editor1').getBoundingClientRect();
    const video = document.querySelector('.video-container');
    video.style.left = div.width - 325;
    dragElement(document.querySelector('.video-container'));
  }

  render() {
    const isAdmin = this.state.isAdmin;
    console.log('isAdmin: ', isAdmin);
    const createdRoom = this.state.createdRoom;
    let loginMsg;
    let button;
    const initialRoomStatus = (
      <div id="roomMsg">
        Office hours have <strong>not</strong> yet started.
      </div>
    );
    if (isAdmin && createdRoom === false) {
      // YOU ARE ADMIN AND HAVE NOT STARTED OFFICE HOURS
      loginMsg = 'Video Chat';
      button = (
        <button id="setup-new-broadcast" className="setup">
          Start office hours
        </button>
      );
    }
    if (isAdmin && createdRoom) {
      // YOU ARE ADMIN AND HAVE STARTED OFFICE HOURS
      loginMsg = 'Video Chat in Progress';
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
      button = null;
    }

    return (
      <div className="video-container hidden">
        <div id="video-draggable" className="flip-container">
          <div>
            <Button
              id="flip-video-btn"
              title="flip"
              className="icon-button float-right"
              bsSize="xsmall"
              onClick={() => document.querySelector('#video-draggable').classList.toggle('hover')}
            >
              <Glyphicon glyph="refresh" />
            </Button>
          </div>
          <div className="flipper">
            <div className="front">
              <div id="video-header">{loginMsg}</div>
              <section className="experiment">
                <section>
                  <select id="broadcasting-option">
                    <option>Audio + Video</option>
                    <option>Audio Only</option>
                    <option>Screen</option>
                  </select>
                  {/* <div id="viewerCount"></div> */}
                  {/* <input type="text" id="broadcast-name" placeholder="Enter name..." /> */}
                  <Button
                    id="setup-new-broadcast"
                    className="setup"
                    title="Start Video Chat"
                    bsSize="small"
                    bsStyle="success"
                    onClick={() => {
                      document.querySelector('#video-draggable').classList.toggle('hover');
                    }}
                  >
                    Start
                  </Button>
                  <div id="joinBtn" />
                  <Button className="end" id="end-broadcast" bsSize="small" bsStyle="danger">
                    End
                  </Button>
                  {/* <button className="end" id="end-broadcast">
                    End
                  </button> */}
                </section>
                <hr className="room-divider" />
                <h6>Room Status</h6>
                {initialRoomStatus}
                <div id="viewerCount" />
                <table id="rooms-list" />
              </section>
            </div>
            <div className="back">
              <div id="videos-container" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Video;
