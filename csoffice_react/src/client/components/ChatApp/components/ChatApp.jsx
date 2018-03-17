import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ChatWindow from './ChatWindow.jsx';
import launcherIcon from './../assets/logo-no-bg.svg';
import launcherIconActive from './../assets/close-icon.png';

class ChatApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      launcherIcon,
      isOpen: false
    };
  }

  handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  }

  render() {
    const isOpen = this.props.hasOwnProperty('isOpen')
      ? this.props.isOpen
      : this.state.isOpen;
    const classList = ['sc-launcher', isOpen ? 'opened' : ''];
    return (
      <div>
        <div />
        <div className={classList.join(' ')} onClick={this.handleClick.bind(this)}>
          <MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
          <img className={'sc-open-icon'} src={launcherIconActive} />
          <img className={'sc-closed-icon'} src={launcherIcon} />
        </div>
        <ChatWindow
          messageList={this.props.messageList}
          onUserInputSubmit={this.props.onMessageWasSent}
          agentProfile={this.props.agentProfile}
          isOpen={isOpen}
          onClose={this.handleClick.bind(this)}
          showEmoji={this.props.showEmoji}
        />
      </div>
    );
  }
}

const MessageCount = props => {
  if (props.count === 0 || props.isOpen === true) {
    return null;
  }
  return <div className={'sc-new-messsages-count'}>{props.count}</div>;
};

ChatApp.propTypes = {
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  showEmoji: PropTypes.bool
};

ChatApp.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true
};

export default ChatApp;
