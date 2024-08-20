const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
  }
});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;