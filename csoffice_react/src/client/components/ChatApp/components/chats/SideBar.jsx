import React, { Component } from 'react';

export default class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reciever: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { reciever } = this.state;
    const { onSendPrivateMessage } = this.props;

    onSendPrivateMessage(reciever);
  }

  render() {
    const {
      chats, activeChat, user, setActiveChat, logout,
    } = this.props;
    const { reciever } = this.state;
    return (
      <div id="side-bar">
        <div className="heading">
          <div className="chatApp-logo">
            <img src="./../public/images/codesmith-logo-md.png" alt="Codesmith Logo" />
          </div>
        </div>
        <form onSubmit={this.handleSubmit} className="search">
          <input
            placeholder="Find User"
            type="text"
            value={reciever}
            onChange={(e) => {
              this.setState({ reciever: e.target.value });
            }}
          />
        </form>
        <div className="chat-rooms">Chat Rooms:</div>
        <div
          className="users"
          ref="users"
          onClick={(e) => {
            e.target === this.refs.user && setActiveChat(null);
          }}
        >
          {chats.map((chat) => {
            if (chat.name) {
              const lastMessage = chat.messages[chat.messages.length - 1];
              const chatSideName = chat.users.find(name => name !== user.name) || 'CS Office';
              const classNames = activeChat && activeChat.id === chat.id ? 'active' : '';

              return (
                <div
                  key={chat.id}
                  className={`user ${classNames}`}
                  onClick={() => {
                    setActiveChat(chat);
                  }}
                >
                  {/* CHATROOM/USER PHOTO */}
                  {/* <div className="user-photo">{chatSideName[0].toUpperCase()}</div> */}
                  <div className="user-info">
                    <div className="name">{chatSideName}</div>
                    {lastMessage && <div className="last-message">{lastMessage.message}</div>}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </div>
        <div className="current-user">
          <span>{user.name}</span>
          {/* LOGOUT BUTTON */}
          {/* <div
            onClick={() => {
              logout();
            }}
            title="Logout"
            className="logout"
          >
            Logout
          </div> */}
        </div>
      </div>
    );
  }
}
