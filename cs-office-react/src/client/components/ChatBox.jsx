import React, { Component } from 'react';
import ChatInput from './ChatInput.jsx';

class ChatBox extends React.Component {
  render() {
    return(
      <div>
        <ChatInput />
        This is the ChatBox
      </div>
    )
  }
}

export default ChatBox;