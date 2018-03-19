// THIS FILE RENDERS THE CODE EDITOR, VIDEO, AND CHAT
import React, { Component } from 'react';
import io from 'socket.io-client';
import Video from './Video';
import { ChatApp } from './ChatApp/index';
import Editor from './Editor';
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
      // <div className="Office-container show-grid">
      //   {/* <Video socket={socket} isAdmin={isAdmin} adminName={adminName} /> */}

      //   <div className="Editor-container xs={12} md={8}">
      //     <Editor />
      //   </div>

      // <div className="code-chat-container xs={6} md={4}">
      //   <ChatApp socket={socket} />
      // </div>
      // </div>

      <Grid id="office-container">
        {/* <Row className="show-grid"> */}
        <Col md={8} xs={5}>
          <div className="editor-container ">
            <Editor />
          </div>
        </Col>
        <Col md={4} xs={5}>
          <div className="chat-container ">
            <ChatApp socket={socket} />
          </div>
        </Col>
        {/* </Row> */}
      </Grid>
    );
  }
}

export default Office;
