const socket = require('./server.js').socket;

const {
  VERIFY_USER,
  USER_CONNECTED,
  USER_DISCONNECTED,
  LOGOUT,
  COMMUNITY_CHAT,
  MESSAGE_RECIEVED,
  MESSAGE_SENT,
  TYPING,
} = require('./../client/components/ChatApp/Events');

const {
  createUser,
  createMessage,
  createChat,
} = require('./../client/components/ChatApp/Factories');

let connectedUsers = {};

const communityChat = createChat();

module.exports = function(socket) {
  // console.log('\x1bc'); //clears console
  console.log(`Socket Id:${socket.id}`);

  let sendMessageToChatFromUser;

  let sendTypingFromUser;

  // Verify Username
  socket.on(VERIFY_USER, (nickname, callback) => {
    if (isUser(connectedUsers, nickname)) {
      callback({ isUser: true, user: null });
    } else {
      callback({ isUser: false, user: createUser({ name: nickname }) });
    }
  });

  // User Connects with username
  socket.on(USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    sendMessageToChatFromUser = sendMessageToChat(user.name);
    sendTypingFromUser = sendTypingToChat(user.name);

    socket.emit(USER_CONNECTED, connectedUsers);
    console.log(connectedUsers);
  });

  // User disconnects
  socket.on('disconnect', () => {
    if ('user' in socket) {
      connectedUsers = removeUser(connectedUsers, socket.user.name);

      socket.emit(USER_DISCONNECTED, connectedUsers);
      console.log('Disconnect', connectedUsers);
    }
  });

  // User logsout
  socket.on(LOGOUT, () => {
    connectedUsers = removeUser(connectedUsers, socket.user.name);
    socket.emit(USER_DISCONNECTED, connectedUsers);
    console.log('Disconnect', connectedUsers);
  });

  // Get Community Chat
  socket.on(COMMUNITY_CHAT, (callback) => {
    callback(communityChat);
  });

  socket.on(MESSAGE_SENT, ({ chatId, message }) => {
    sendMessageToChatFromUser(chatId, message);
  });

  socket.on(TYPING, ({ chatId, isTyping }) => {
    sendTypingFromUser(chatId, isTyping);
  });
};
/*
* Returns a function that will take a chat id and a boolean isTyping
* and then emit a broadcast to the chat id that the sender is typing
* @param sender {string} username of sender
* @return function(chatId, message)
*/
function sendTypingToChat(user) {
  return (chatId, isTyping) => {
    socket.emit(`${TYPING}-${chatId}`, { user, isTyping });
  };
}

/*
* Returns a function that will take a chat id and message
* and then emit a broadcast to the chat id.
* @param sender {string} username of sender
* @return function(chatId, message)
*/
function sendMessageToChat(sender) {
  return (chatId, message) => {
    socket.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({ message, sender }));
  };
}

/*
* Adds user to list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to added to the list.
* @return userList {Object} Object with key value pairs of Users
*/
function addUser(userList, user) {
  const newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList;
}

/*
* Removes user from the list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {string} name of user to be removed
* @return userList {Object} Object with key value pairs of Users
*/
function removeUser(userList, username) {
  const newList = Object.assign({}, userList);
  delete newList[username];
  return newList;
}

/*
* Checks if the user is in list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {String}
* @return userList {Object} Object with key value pairs of Users
*/
function isUser(userList, username) {
  return username in userList;
}
