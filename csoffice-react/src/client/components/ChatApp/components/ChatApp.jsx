import React, { Component } from 'react';
import PropTypes from 'prop-types'; // for validating PropTypes
// import ChatInput from './ChatInput.jsx';

class ChatApp extends Component {
  render() {
    return (
      <div className="chatContainer">
        <div className="history">
          <div className="controls">
            <div>
              <form onSubmit="handle" className="textContainer">
                <input
                  id="textInput"
                  type="text"
                  placeholder="Message"
                  onKeyPress="handle(event)"
                />
                <button name="action" type="submit" className="sendText" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatApp;
