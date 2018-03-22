// THIS FILE RENDERS THE CODE EDITOR, VIDEO, AND CHAT
import React, { Component } from 'react';
import io from 'socket.io-client';
import Video from './Video';
import { ChatApp } from './ChatApp/index';
import Editor from './Editor';
import './../css/office.css';

const socketUrl = 'http://localhost:3000/';
class Office extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      isAdmin: true,
      adminName: 'Admin' 
    };
    this.initSocket = this.initSocket.bind(this);
  }

  componentWillMount() {
    this.initSocket();
  }

  /*
	*	Connect to and initializes the socket.
	*/
  initSocket() {
    const socket = io(socketUrl);
    socket.on('connect', () => {
      console.log('Connected Socket in Client');
    });
    this.setState({ socket });
  }

  render() {
    const { socket, isAdmin, adminName } = this.state;
    return (
      <div className="Office-container">
        <div className="Video-container">
          <Video socket={socket} isAdmin={isAdmin} adminName={adminName}/> 
         </div> 
        <div className="code-chat-container">
          <Editor />
          <ChatApp socket={socket} />
        </div>
      </div>
    );
  }
}

export default Office;
