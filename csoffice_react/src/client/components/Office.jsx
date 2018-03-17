// THIS FILE RENDERS THE CODE EDITOR, VIDEO, AND CHAT
import React, { Component } from 'react';
import Video from './Video.jsx';
import { ChatApp } from './ChatApp/index.jsx';
import messageHistory from './ChatApp/components/Messages/MessageHistory';
import CodeEditor from './CodeEditor.jsx';
import Highlight from 'react-highlight';

class Office extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      message: '',
      messages: [],
      messageList: messageHistory,
      newMessageCount: 0,
      isOpen: false
    };
  }

  onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    });
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
        <Video />
        <CodeEditor />
        <ChatApp
          agentProfile={{
            teamName: 'Codesmith Chat',
            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
          }}
          onMessageWasSent={this.onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          newMessageCount={this.state.newMessagesCount}
          handleClick={this.handleClick.bind(this)}
          isOpen={this.state.isOpen}
          showEmoji
        />
      </div>
    );
  }
}

export default Office;
