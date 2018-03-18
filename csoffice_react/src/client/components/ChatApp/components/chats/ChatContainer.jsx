import React, { Component } from 'react';
import SideBar from './SideBar.jsx';
import { COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, TYPING } from './../../Events';
import ChatHeading from './ChatHeading.jsx';
import Messages from './../messages/Messages.jsx';
import MessageInput from './../messages/MessageInput.jsx';

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      activeChat: null,
    };

    this.resetChat = this.resetChat.bind(this);
    this.addChat = this.addChat.bind(this);
    this.addMessageToChat = this.addMessageToChat.bind(this);
    this.updateTypingInChat = this.updateTypingInChat.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendTyping = this.sendTyping.bind(this);
    this.setActiveChat = this.setActiveChat.bind(this);
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.emit(COMMUNITY_CHAT, this.resetChat);
  }

  /*
  * Reset the chat back to only the chat passed in.
  * @param chat {Chat}
  */
  resetChat(chat) {
    return this.addChat(chat, true);
  }

  /*
  * Adds chat to the chat container, if reset is true removes all chats
  * and sets that chat to the main chat/
  * Sets the message and typing socket events for the chat.
  *
  * @param chat {Chat} the chat to be added.
  * @param reset {boolean} if true will set the chat as the only chat
  */
  addChat(chat, reset) {
    const { socket } = this.props;
    const { chats } = this.state;
    const newChats = reset ? [chat] : [...chats, chat];
    this.setState({ chats: newChats });

    const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`;
    const typingEvent = `${TYPING}-${chat.id}`;

    socket.on(typingEvent);
    socket.on(messageEvent, this.addMessageToChat(chat.id));
  }

  /*
   * Returns a function that will add message to chat with the chatId passed in
   * @param chatId {number}
   */
  addMessageToChat(chatId) {
    return (message) => {
      const { chats } = this.state;
      const newChats = chats.map((chat) => {
        if (chat.id === chatId) chat.messages.push(message);
        return chat;
      });
      this.setState({ chats: newChats });
    };
  }

  /*
   * Updates the typing of chat with id passes in
   * @param chatId {number}
   */
  updateTypingInChat(chatId) {
    console.log('hi');
  }

  /*
   * Adds a message to the specified chat
   * @param chatId {number} The id of the chat to be added to.
   * @param message {string} The message to be added to the chat.
   */

  /*
  * Adds a message to the specified chat
  * @param chatId {number} The id of the chat to be added to.
  * @param message {string} The message to be added to the chat
  */
  sendMessage(chatId, message) {
    const { socket } = this.props;
    socket.emit(MESSAGE_SENT, { chatId, message });
  }

  /*
  * Sends typing status to server.
  * chatId {number} the id of the chat being typed in
  * typing {boolean} If the user is typing still or not
  */
  sendTyping(chatId, isTyping) {
    const { socket } = this.props;
    socket.emit(TYPING, { chatId, isTyping });
  }

  setActiveChat(activeChat) {
    this.setState({ activeChat });
  }

  render() {
    const { user, logout } = this.props;
    const { chats, activeChat } = this.state;
    return (
      <div className="container">
        <SideBar
          logout={logout}
          chats={chats}
          user={user}
          activeChat={activeChat}
          setActiveChat={this.setActiveChat}
        />
        <div className="chat-room-container">
          {activeChat !== null ? (
            <div className="chat-room">
              <ChatHeading name={activeChat.name} />
              <Messages
                messages={activeChat.messages}
                user={user}
                typingUsers={activeChat.typingUsers}
              />
              <MessageInput
                sendMessage={(message) => {
                  this.sendMessage(activeChat.id, message);
                }}
                sendTyping={(isTyping) => {
                  this.sendTyping(activeChat.id, isTyping);
                }}
              />
            </div>
          ) : (
            <div className="chat-room choose">
              <h3>Choose a chat!</h3>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ChatContainer;
