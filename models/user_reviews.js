const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true
  },


});

const User_Reviews = mongoose.model('User_Reviews', UserSchema);
module.exports = User_Reviews;
