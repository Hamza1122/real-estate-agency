const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  agent_name: {
    type: String,
    required: true
  },
  agent_title: {
    type: String,
    required: true
  },
  agent_email: {
    type: String,
    required: true
  },
  // agent_experience: {
  //   type: String,
  //   required: true
  // },
  // agent_country: {
  //   type: String,
  //   required: true
  // },
  agent_about_me: {
    type: String,
    required: true
  },
  agent_address: {
    type: String,
    required: true
  },
  agent_city: {
    type: String,
    required: true
  },
  agent_dob: {
    type: String,
    required: true

  },
  agent_id: {
    type: String,
    required: true

  },
agent_type: {
    type: String,
    required: true

  },
  agent_age: {
      type: String,
      required: true

    },

    agent_experience: {
        type: String,
        required: true

      },
      agent_country: {
          type: String,
          required: true

        },





});

const Agent_Info = mongoose.model('Agent_Info', UserSchema);
module.exports = Agent_Info;
