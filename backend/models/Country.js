const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  continent: {
    type: String,
    required: true,
  },
  flag_url: {
    type: String,
  },
  gold_medals: {
    type: Number,
  },
  silver_medals: {
    type: Number,
  },
  bronze_medals: {
    type: Number,
  },
  total_medals: {
    type: Number,
  },
  rank: {
    type: Number,
  },
  rank_total_medals: {
    type: Number,
  },
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;