import React, { Component } from 'react';

class Messages extends Component {
  render() {
    const { messages, user, typingUsers } = this.props;
    return (
      <div ref="container" className="thread-container">
        <div className="thread">
          {/* maps through all messages and prints them out */}
          {messages.map(mes => (
            <div
              key={mes.id}
              // if sender is the user then className = 'right' for styling the message to the right
              className={`message-container ${mes.sender === user.name && 'right'}`}
            >
              <div className="time">{mes.time}</div>
              <div className="data">
                <div className="message">{mes.message}</div>
                <div className="name">{mes.sender}</div>
              </div>
            </div>
          ))}
          {/* loop through the typingUsers array and print out their name with is typing... */}
          {typingUsers.map(name => (
            <div key={name} className="typing-user">
              {`${name} is typing . . .`}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Messages;
