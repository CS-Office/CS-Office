// THIS FILE RENDERS THE CODE EDITOR, VIDEO, AND CHAT
import React, { Component } from 'react';
import Video from './Video.jsx';
import { ChatApp } from './ChatApp/index.jsx';
import CodeEditor from './CodeEditor.jsx';

class Office extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.history.push('/office');
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
