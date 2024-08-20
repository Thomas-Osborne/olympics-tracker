const mongoose = require('mongoose');

// Define the Competitor schema
const competitorSchema = new mongoose.Schema({
    country_id: {
        type: String,
        required: true
    },
    country_flag_url: {
        type: String,
        required: true
    },
    competitor_name: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    result_position: {
        type: String,
        default: ""
    },
    result_winnerLoserTie: {
        type: String,
        required: true
    },
    result_mark: {
        type: String,
        required: true
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
        required: true
    },
    discipline_name: {
        type: String,
        required: true
    },
    discipline_pictogram: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: null
    },
    venue_name: {
        type: String,
        required: true
    },
    event_name: {
        type: String,
        required: true
    },
    detailed_event_name: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    is_medal_event: {
        type: Number,
        required: true
    },
    is_live: {
        type: Number,
        required: true
    },
    gender_code: {
        type: String,
        required: true
    },
    competitors: [competitorSchema]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;