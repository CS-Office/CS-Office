// THIS FILE RENDERS THE CODE EDITOR, VIDEO, AND CHAT
import React, { Component } from 'react';
import Video from './Video.jsx';
import ChatApp from './ChatApp/ChatApp.jsx';
import CodeEditor from './CodeEditor.jsx';
import io from 'socket.io-client';

class Office extends Component {
  constructor(props) {
    super(props);
  }

  socket = io.connect();

  render() {
    return (
      <div>
        <Video />
        <ChatApp socket={this.socket} />
        <CodeEditor socket={this.socket} />
      </div>
    );
  }
}

export default Office;
