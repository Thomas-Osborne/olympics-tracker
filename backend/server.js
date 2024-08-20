const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const Country = require('./models/Country');
const Event = require('./models/Event');
const Sport = require('./models/Sport');
const Venue = require('./models/Venue');

const app = express();
app.use(cors());

app.get('/api/events', async (req, res) => {
    try {
        const response = await Event.find();
        res.json(response);
    } catch (error) {
        console.error('Error fetching events: ', error);
        res.status(500).send('An error has occurred.');
    }
});

app.get('/api/events/:id', async (req, res) => {
    try {
        const response = await Event.findOne({ id: req.params.id });
        if (!response) {
            return res.status(404).json({ message: 'Event not found.'});
        }
        res.json(response);
    } catch (error) {
        console.error('Error fetching event: ', error);
        res.status(500).send('An error occurred');
    }
});

app.get('/api/venues', async (req, res) => {
    try {
        const response = await Venue.find();
        res.json(response);
    } catch (error) {
        console.error('Error fetching venues: ', error);
        res.status(500).send('An error has occurred.');
    }
});

app.get('/api/venues/:id', async (req, res) => {
    try {
        const response = await Venue.findOne({ id: req.params.id });
        if (!response) {
            return res.status(404).json({ message: 'Venue not found.'});
        }
        res.json(response);
    } catch (error) {
        console.error('Error fetching venue: ', error);
        res.status(500).send('An error occurred');
    }
});

app.get('/api/sports', async (req, res) => {
    try {
        const response = await Sport.find();
        res.json(response);
    } catch (error) {
        console.error('Error fetching sports: ', error);
        res.status(500).send('An error has occurred.');
    }
});

app.get('/api/sports/:id', async (req, res) => {
    try {
        const response = await Sport.findOne({ id: req.params.id });
        if (!response) {
            return res.status(404).json({ message: 'Sport not found.'});
        }
        res.json(response);
    } catch (error) {
        console.error('Error fetching sport: ', error);
        res.status(500).send('An error has occurred');
    }
});

app.get('/api/countries', async (req, res) => {
    try {
        const response = await Country.find();
        res.json(response);
    } catch (error) {
        console.error('Error fetching countries: ', error);
        res.status(500).send('An error has occurred.');
    }
});

app.get('/api/countries/:id', async (req, res) => {
    try {
        const response = await Country.findOne({ id: req.params.id });
        if (!response) {
            return res.status(404).json({ message: 'Country not found.'});
        }
        res.json(response);
    } catch (error) {
        console.error('Error fetching country: ', error);
        res.status(500).send('An error has occurred.');
    }
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to DB")
        // listen for requests
        app.listen(process.env.PORT, async (req, res) => {
            console.log(`Server running on port ${process.env.PORT}`);
            // attemptFetchingData(); // start attempting to fetch immediately

            // const timeInterval = 15 * 60 * 60 * 1000 // then check every 15minutes;
            // setInterval(() => attemptFetchingData(), timeInterval);
        })
    })
    .catch((error => {
        console.log("Failed to connect to DB:", error);
    }))

const attemptFetchingData = async () => {
    try {
        const venues = await axios.get('https://apis.codante.io/olympic-games/venues');
        const venuesData = venues.data.data;

        for (const venue of venuesData) {
            // Check if the venue already exists to avoid duplicates
            const existingVenue = await Venue.findOne({ id: venue.id });
            if (existingVenue) {
                await Venue.updateOne({ id: venue.id }, venue);
            } else {
                await Venue.create(venue);
            }
        }

        console.log("Venues from external API updated.");

        const sports = await axios.get('https://apis.codante.io/olympic-games/disciplines');
        const sportsData = sports.data.data;

        for (const sport of sportsData) {
            // Check if the sport already exists to avoid duplicates
            const existingSport = await Sport.findOne({ id: sport.id });
            if (existingSport) {
                await Sport.updateOne({ id: sport.id }, sport);
            } else {
                await Sport.create(sport);
            }
        }
        console.log("Sports from external API updated.");

        const countries = await axios.get('https://apis.codante.io/olympic-games/countries');
        const countryData = countries.data.data;

        for (const country of countryData) {
            // Check if the country already exists to avoid duplicates
            const existingCountry = await Country.findOne({ id: country.id });
            if (existingCountry) {
                await Country.updateOne({ id: country.id }, country);
            } else {
                await Country.create(country);
            }
        }
        console.log("Countries from external API updated.");

        const events = await axios.get('https://apis.codante.io/olympic-games/events?page=1');
        const eventsData = events.data.data;
        lastPage = events.data.meta.last_page;

        for (const event of eventsData) {
            // Check if the event already exists to avoid duplicates
            const existingEvent = await Event.findOne({ id: event.id });
            if (existingEvent) {
                await Event.updateOne({ id: event.id }, event);
            } else {
                await Event.create(event);
            }
        }

        console.log(`Events page 1 of ${lastPage} from external API updated.`);

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms)); // impose a delay
        const minuteMilliseconds = 60000; // number of milliseconds in a minute
        const requestsPerMin = 50; // max is 100 so give lots of room

        for (let page = 2; page <= lastPage; page++) {
            const events = await axios.get(`https://apis.codante.io/olympic-games/events?page=${page}`);
            const eventsData = events.data.data;
            for (const event of eventsData) {
                // Check if the event already exists to avoid duplicates
                const existingEvent = await Event.findOne({ id: event.id });
                if (existingEvent) {
                    await Event.updateOne({ id: event.id }, event);
                } else {
                    await Event.create(event);
                }
            }
            console.log(`Events page ${page} of ${lastPage} from external API updated.`);

            await delay(minuteMilliseconds / requestsPerMin);
        }

        console.log("Events from external API updated.");

    } catch (error) {
        console.log("An error occurred: ", error);
    }
}