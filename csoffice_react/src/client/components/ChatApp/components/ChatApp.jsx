import React, { Component } from 'react';
import { USER_CONNECTED, LOGOUT } from './../Events';
import LoginForm from './LoginForm.jsx';
import ChatContainer from './chats/ChatContainer.jsx';

export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: this.props.socket,
      user: null,
    };

    // this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  /*
	* 	Sets the user property in state
	*	@param user {id:number, name:string}
	*/
  setUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  };

  /*
	*	Sets the user property in state to null.
	*/
  logout() {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  }

  render() {
    const { socket, user } = this.state;

    return (
      <div className="chat-container">
        {!user ? (
          <LoginForm socket={socket} setUser={this.setUser} />
        ) : (
          <ChatContainer socket={socket} user={user} logout={this.logout} />
        )}
      </div>
    );
  }
}
