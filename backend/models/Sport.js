const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  pictogram_url: {
    type: String,
  },
  pictogram_url_dark: {
    type: String,
  }
});

const Sport = mongoose.model('Sport', sportSchema);

module.exports = Sport;