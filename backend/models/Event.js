const mongoose = require('mongoose');

// Define the Competitor schema
const competitorSchema = new mongoose.Schema({
    country_id: {
        type: String,
    },
    country_flag_url: {
        type: String,
    },
    competitor_name: {
        type: String,
    },
    position: {
        type: Number,
    },
    result_position: {
        type: String,
        default: ""
    },
    result_winnerLoserTie: {
        type: String,
    },
    result_mark: {
        type: String,
    }
});

const eventSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    day: {
        type: String,
    },
    discipline_name: {
        type: String,
    },
    discipline_pictogram: {
        type: String,
    },
    name: {
        type: String,
        default: null
    },
    venue_name: {
        type: String,
    },
    event_name: {
        type: String,
    },
    detailed_event_name: {
        type: String,
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    status: {
        type: String,
    },
    is_medal_event: {
        type: Number,
    },
    is_live: {
        type: Number,
    },
    gender_code: {
        type: String,
    },
    competitors: [competitorSchema]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;