const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  property_status: {
    type: String,
    required: true
  },
  property_name: {
    type: String,
    required: true
  },
  property_id: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  bedrooms: {
    type: String,
    required: true
  },
  bath_room: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  property_address: {
    type: String,
    required: true
  },
  zip_code: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
status: {
    type: String,
    required: true
  },
  property_type: {
     type: String,
    required: true
   },
  city_name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  master_bed: {
    type: String,
    required: true
  },
  kitchen: {
    type: String,
    required: true
  },
  dining: {
    type: String,
    required: true
  },
  baths: {
    type: String,
    required: true
  },












});

const Property = mongoose.model('Property', UserSchema);
module.exports = Property;
