const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

app.get('/api/events', async (req, res) => {
    try {
        const response = await axios.get('https://apis.codante.io/olympic-games/events');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send('An error has occurred.');
    }
});

app.get('/api/events/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get(`https://apis.codante.io/olympic-games/events/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).send('An error occurred');
    }
});

app.get('/api/venues', async (req, res) => {
    try {
        const response = await axios.get('https://apis.codante.io/olympic-games/venues');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching venues:', error);
        res.status(500).send('An error has occurred.');
    }
});

app.get('/api/venues/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get('https://apis.codante.io/olympic-games/venues');
        const venues = response.data.data;

        const venue = venues.find(v => v.id === id);

        if (venue) {
            res.json(venue);
        } else {
            res.status(404).send('Venue not found.');
        }
    } catch (error) {
        console.error('Error fetching venue:', error);
        res.status(500).send('An error has occurred.');
    }
});

app.get('/api/disciplines', async (req, res) => {
    try {
        const response = await axios.get('https://apis.codante.io/olympic-games/disciplines');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching disciplines:', error);
        res.status(500).send('An error has occurred.');
    }
});

app.get('/api/disciplines/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get('https://apis.codante.io/olympic-games/disciplines');
        const disciplines = response.data.data;

        const discipline = disciplines.find(v => v.id === id);

        if (discipline) {
            res.json(discipline);
        } else {
            res.status(404).send('Discipline not found.');
        }
    } catch (error) {
        console.error('Error fetching discipline:', error);
        res.status(500).send('An error has occurred.');
    }
});

app.get('/api/countries', async (req, res) => {
    try {
        const response = await axios.get('https://apis.codante.io/olympic-games/countries');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).send('An error has occurred.');
    }
});

app.get('/api/countries/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get('https://apis.codante.io/olympic-games/countries');
        const countries = response.data.data;

        const country = countries.find(v => v.id === id);

        if (country) {
            res.json(country);
        } else {
            res.status(404).send('Country not found.');
        }
    } catch (error) {
        console.error('Error fetching country:', error);
        res.status(500).send('An error has occurred.');
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});