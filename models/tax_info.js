const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  tax: {
    type: String,
    required: true
  },
   tax_id: {
    type: String,
    required: true
  },

  // tax_info: {
  //   type: String,
  //   required: true
  // },
  //
  //
  //
  //

});

const Tax_Info = mongoose.model('Tax_info', UserSchema);
module.exports = Tax_Info;
