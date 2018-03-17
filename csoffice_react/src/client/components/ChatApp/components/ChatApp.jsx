import React, { Component } from 'react';
import io from 'socket.io-client';
import './../styles/chatApp.css';
import { USER_CONNECTED, LOGOUT } from './../Events';
import LoginForm from './LoginForm.jsx';

const socketURL = 'http://localhost:3000/office';
class ChatApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      user: null
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  // CONNECTED TO AND INITIALIZED THE SOCKET-CLIENT
  initSocket() {
    const socket = io(socketURL);
    socket.on('connect', () => console.log('=== CLIENT SOCKET CONNECTED ==='));
    this.setState({ socket });
  }

  /*
* Sets the user property in state
* @param user {id:number, name:string}
*/
  setUser(user) {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  }

  /*
* Sets the user property in state to null
*/
  logout() {
    // const socket = this.state.socket;
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  }

  render() {
    const { socket } = this.state;
    return (
      <div className="container">
        <LoginForm socket={socket} setUser={this.setUser} />
      </div>
    );
  }
}
export default ChatApp;

// import PropTypes from 'prop-types';
// import React, { Component } from 'react';
// import ChatWindow from './ChatWindow.jsx';
// import launcherIcon from './../assets/logo-no-bg.svg';
// import launcherIconActive from './../assets/close-icon.png';

// class ChatApp extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       launcherIcon,
//       isOpen: false
//     };
//   }

//   handleClick() {
//     if (this.props.handleClick !== undefined) {
//       this.props.handleClick();
//     } else {
//       this.setState({
//         isOpen: !this.state.isOpen
//       });
//     }
//   }

//   render() {
//     const isOpen = this.props.hasOwnProperty('isOpen')
//       ? this.props.isOpen
//       : this.state.isOpen;
//     const classList = ['sc-launcher', isOpen ? 'opened' : ''];
//     return (
//       <div>
//         <div />
//         <div className={classList.join(' ')} onClick={this.handleClick.bind(this)}>
//           <MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
//           <img className={'sc-open-icon'} src={launcherIconActive} />
//           <img className={'sc-closed-icon'} src={launcherIcon} />
//         </div>
//         <ChatWindow
//           messageList={this.props.messageList}
//           onUserInputSubmit={this.props.onMessageWasSent}
//           agentProfile={this.props.agentProfile}
//           isOpen={isOpen}
//           onClose={this.handleClick.bind(this)}
//           showEmoji={this.props.showEmoji}
//         />
//       </div>
//     );
//   }
// }

// const MessageCount = props => {
//   if (props.count === 0 || props.isOpen === true) {
//     return null;
//   }
//   return <div className={'sc-new-messsages-count'}>{props.count}</div>;
// };

// ChatApp.propTypes = {
//   onMessageWasReceived: PropTypes.func,
//   onMessageWasSent: PropTypes.func,
//   newMessagesCount: PropTypes.number,
//   isOpen: PropTypes.bool,
//   handleClick: PropTypes.func,
//   messageList: PropTypes.arrayOf(PropTypes.object),
//   showEmoji: PropTypes.bool
// };

// ChatApp.defaultProps = {
//   newMessagesCount: 0,
//   showEmoji: true
// };

// export default ChatApp;
