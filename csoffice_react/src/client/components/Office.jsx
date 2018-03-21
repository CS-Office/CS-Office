// THIS FILE RENDERS THE CODE EDITOR, VIDEO, AND CHAT
import React, { Component } from 'react';
import io from 'socket.io-client';
import Video from './Video';
import { ChatApp } from './ChatApp/index';
import Editor from './Editor';
import EditorOptions from './../components/EditorOptions';
import { Grid, Row, Col } from 'react-bootstrap';
import './../css/office.css';

const socketUrl = 'http://localhost:3000/';
class Office extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      isAdmin: true,
      adminName: 'Admin',
    };
    this.initSocket = this.initSocket.bind(this);
    this.openEditorOption = this.openEditorOption.bind(this);
  }

  componentWillMount() {
    this.initSocket();
  }

  initSocket() {
    const socket = io(socketUrl);
    socket.on('connect', () => {});
    this.setState({ socket });
  }

  openEditorOption() {
    document.getElementById('mySidenav').style.width = '300px';
  }

  render() {
    const { socket, isAdmin, adminName } = this.state;
    return (
      <Grid id="office-container">
        <Row className="show-grid">
          <Col id="editor1" md={8} xs={5}>
            <span id="editor-option-btn" title="Settings" onClick={this.openEditorOption}>
              &#9776;
            </span>
            <div className="editor-container ">
              <Editor socket={socket} />
              <EditorOptions />
            </div>
          </Col>
          <Col id="chat" md={4} xs={4}>
            <div className="chat-container ">
              <ChatApp socket={socket} />
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Office;
