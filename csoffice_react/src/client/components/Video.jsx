import React, { Component } from 'react';
import videoJS from './videoJS.js';
// import io from 

// import io from './../../server/server.js';
// import <script src="https://cdn.webrtc-experiment.com/DetectRTC.js"></script>
// const SIGNALING_SERVER = 'https://webrtcweb.com:9559/';
// const SIGNALING_SERVER = 'http://localhost:5000';
class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: this.props.isAdmin,
            adminName: this.props.adminName,
            createdRoom: false,
            socket: this.props.socket
        }
        // this.count = 0;
        // this.pc = {};
        // this.handleCreateRoom = this.handleCreateRoom.bind(this);
        // this.startConnection = this.startConnection.bind(this);
        // this.initSocket = this.initSocket.bind(this);
        // this.setupNewBroadcastButtonClickHandler = this.setupNewBroadcastButtonClickHandler.bind(this);
        // this.captureUserMedia = this.captureUserMedia.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        // this.hideUnnecessaryStuff = this.hideUnnecessaryStuff.bind(this);
        // this.rotateInCircle = this.rotateInCircle.bind(this);
        // const { socket } = this.props;
        // console.log('VIDEO socketttttt', socket)
    }

    componentDidMount() {
        console.log('in here')
        // videoJS(this.state.socket);
        const video = videoJS(this.state.socket);
        // broadcast(config)
    }
  

    render () {
        // let isAdmin = this.state.isAdmin;
        // console.log('isAdmin: ', isAdmin);
        // let createdRoom = this.state.createdRoom;
        // let disableBtn = createdRoom === true;
        // let name = this.state.adminName;
        // let loginMsg;
        let button;
        // if (isAdmin && createdRoom === false) { //YOU ARE ADMIN AND HAVE NOT STARTED OFFICE HOURS
        //     loginMsg = 'You have not started office hours.'
            button = (<button id="setup-new-broadcast" className="setup" onClick={this.handleCreateRoom}>Start office hours</button>);
        // }
        // if (isAdmin && createdRoom) { //YOU ARE ADMIN AND HAVE STARTED OFFICE HOURS
        //     loginMsg = 'Office hours have started.'
        //     button = (<button id="end-broadcast" className="setup">End office hours</button>);
        // }
        // if (!isAdmin && !createdRoom) { //YOU ARE STUDENT AND OFFICE HOURS HAVE NOT STARTED
        //     loginMsg = 'Please wait. Office hours have not yet started.'
        //     button = null;
        // }
        // if (!isAdmin && createdRoom) { //YOU ARE STUDENT AND OFFICE HOURS HAVE STARTED
        //     loginMsg = 'Office hours have started.'
        //     button = (<button id="join-broadcast" className="setup">Join office hours</button>);
        // }

        return (
            
        <div>
            
            <h1>
                 CS Office Hours
            </h1>
            

        <section className="experiment">
            <section>
            <select id="broadcasting-option">
            <option>Audio + Video</option>
            <option>Only Audio</option>
            <option>Screen</option>
          
        </select>

            <input type="text" id="broadcast-name" />
            <button id="setup-new-broadcast" className="setup">Start Office Hours</button>
        </section>

      
        <table id="rooms-list"></table>

     
        <div id="videos-container"></div>
        </section>
        </div>

            /* {/* <div id="videoContainer">
                {/* <h1>{loginMsg}</h1> */
            /* <video id="localVideo"></video>
                {button}
                <div id="joinerContainer">
                <table style={{width: 100}} id="joiners-list"></table>
                {/* {tr} */
                /* </div>
                <div id="videos-container"></div>
                    </div>  */
            // </div>
        
        );
    }
}

export default Video;

