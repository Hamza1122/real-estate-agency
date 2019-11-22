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
  site_link: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },


});

const Contact_Us = mongoose.model('Contact_Us', UserSchema);
module.exports = Contact_Us;
