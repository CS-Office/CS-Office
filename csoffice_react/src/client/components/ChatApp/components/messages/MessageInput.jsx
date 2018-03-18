import React, { Component } from 'react';

class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      isTyping: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.sendMessage();
    this.setState({ message: '' });
  }

  sendMessage() {
    this.props.sendMessage(this.state.message);
  }

  sendTyping() {
    console.log('hello');
  }

  render() {
    const { message } = this.state;
    return (
      <div className="message-input">
        <form onSubmit={this.handleSubmit} className="message-form">
          <input
            id="message"
            ref="messageinput"
            type="text"
            className="form-control"
            value={message}
            autoComplete="off"
            placeholder="Send a message..."
            // if keypress is not 'enter' then send 'sendTyping' to the server
            onKeyUp={(e) => {
              e.keyCode !== 13 && this.sendTyping();
            }}
            // change the message state to the changed target value
            onChange={({ target }) => {
              this.setState({ message: target.value });
            }}
          />
          {/* if message.length is less than 1 then disable the button */}
          <button disabled={message.length < 1} type="submit" className="send">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default MessageInput;
