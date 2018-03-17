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
  }

  render() {
    return (
      <div>
        <Video />
        <CodeEditor />
        <ChatApp />
      </div>
    );
  }
}

export default Office;
