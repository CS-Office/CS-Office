import React, { Component } from 'react';
import './../styles/chatApp.css';
import { USER_CONNECTED, LOGOUT } from './../Events';
import LoginForm from './LoginForm.jsx';
import ChatContainer from './chats/ChatContainer.jsx';

export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  /*
	* 	Sets the user property in state
	*	@param user {id:number, name:string}
	*/
  setUser(user) {
    this.props.socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  }

  /*
	*	Sets the user property in state to null.
	*/
  logout() {
    this.props.socket.emit(LOGOUT);
    this.setState({ user: null });
  }

  render() {
    // const { title } = this.props;
    const { user } = this.state;
    const { socket } = this.props;

    return (
      <div className="container">
        {!user ? (
          <LoginForm socket={socket} setUser={this.setUser} />
        ) : (
          <ChatContainer socket={socket} user={user} logout={this.logout} />
        )}
      </div>
    );
  }
}
