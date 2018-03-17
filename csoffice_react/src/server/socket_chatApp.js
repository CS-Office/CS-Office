const socket = require('./server.js').socket;

module.exports = function(socket) {
  console.log('SOCKET ID: ', socket.id);
};
