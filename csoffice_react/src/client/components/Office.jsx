// THIS FILE RENDERS THE CODE EDITOR, VIDEO, AND CHAT
import React, { Component } from 'react';
import Video from './Video.jsx';
import { ChatApp } from './ChatApp/index.jsx';
import CodeEditor from './CodeEditor.jsx';
import Highlight from 'react-highlight';

class Office extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMessageCount: 0,
      isOpen: false
    };
  }

  handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessageCount: 0
    });
  }

  render() {
    return (
      <div>
        HELLO
        <Video />
        <CodeEditor />
        <ChatApp
          agentProfile={{
            teamName: 'react-live-chat',
            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
          }}
          handleClick={this.handleClick.bind(this)}
          isOpen={this.state.isOpen}
          showEmoji
        />
      </div>
    );
  }
}

export default Office;
