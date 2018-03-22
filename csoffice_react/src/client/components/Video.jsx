import React, { Component } from 'react';
import Broadcast from './Broadcast.js';
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
            socket: this.props.socket,
            createdRoom: false,
            numberOfViewers: 0
        }
    
    }

    componentDidMount() {
        console.log('in here')
        if (this.state.isAdmin) {
            const video = Broadcast(this.state);
        }
        // videoJS(this.state.socket);
        // const video = videoJS(this.state.socket);
        // broadcast(config)
    }



    render () {
        let isAdmin = this.state.isAdmin;
        console.log('isAdmin: ', isAdmin);
        let createdRoom = this.state.createdRoom;
        // let disableBtn = createdRoom === true;
        // let name = this.state.adminName;
        let loginMsg;
        let btnStart;
        let btnEnd;
        if (isAdmin && createdRoom === false) { //YOU ARE ADMIN AND HAVE NOT STARTED OFFICE HOURS
            loginMsg = 'You have not started office hours.'
            btnStart = (<button id="setup-new-broadcast" className="setup">Start Call</button>);
            btnEnd = (<button id="end-broadcast" className="setup">End Call</button>);

        }
        if (isAdmin && createdRoom) { //YOU ARE ADMIN AND HAVE STARTED OFFICE HOURS
            loginMsg = 'Office hours have started.'
            button = (<button id="end-broadcast" className="setup">End office hours</button>);
        }
        if (!isAdmin && !createdRoom) { //YOU ARE STUDENT AND OFFICE HOURS HAVE NOT STARTED
            loginMsg = 'Please wait. Office hours have not yet started.'
            button = null;
        }
        if (!isAdmin && createdRoom) { //YOU ARE STUDENT AND OFFICE HOURS HAVE STARTED
            loginMsg = 'Office hours have started.'
            button = null;
        }

        return (

        <div>
            <h1>CS Office Hours</h1>
            <div id='vidWelcomeHeader'>
            <h4>{loginMsg}</h4>
            </div>
            <div id='vidHeader'>
            </div>
        <section className="experiment">
            <section>
            <select id="broadcasting-option">
            <option>Audio + Video</option>
            <option>Audio Only</option>
            <option>Screen</option>
        </select>
            {/* <input type="text" id="broadcast-name" /> */}
            {btnStart}
            {btnEnd}
            {/* <button id="setup-new-broadcast" className="setup">Start office hours</button>; */}
        </section>

        <table id="rooms-list"></table>
        <div id="videos-container"></div>
        </section>
        </div>
        );
    }
}
export default Video;
