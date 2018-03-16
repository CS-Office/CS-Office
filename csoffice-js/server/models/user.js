//MODEL FOR PASSPORT JS USER
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String
});

module.exports = mongoose.model('users', userSchema);
