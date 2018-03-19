import React, { Component } from 'react';

export default class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      isTyping: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendTyping = this.sendTyping.bind(this);
    this.startCheckingTyping = this.startCheckingTyping.bind(this);
    this.stopCheckingTyping = this.stopCheckingTyping.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.sendMessage();
    this.setState({ message: '' });
  }

  sendMessage() {
    this.props.sendMessage(this.state.message);
  }

  componentWillUnmount() {
    this.stopCheckingTyping();
  }

  sendTyping() {
    this.lastUpdateTime = Date.now();
    // If user is not typing then set state to true
    if (!this.state.isTyping) {
      this.setState({ isTyping: true });
      this.props.sendTyping(true);
      this.startCheckingTyping();
    }
  }

  /*
	*	startCheckingTyping
	*	Start an interval that checks if the user is typing.
	*/
  startCheckingTyping() {
    this.typingInterval = setInterval(() => {
      // set istyping to false if user hasnt been typing for more than 1 sec
      if (Date.now() - this.lastUpdateTime > 1000) {
        this.setState({ isTyping: false });
        this.stopCheckingTyping();
      }
    }, 1000);
  }

  /*
	*	stopCheckingTyping
	*	Start the interval from checking if the user is typing.
	*/
  stopCheckingTyping() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.props.sendTyping(false);
    }
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
