import {
    BrowserRouter, Routes, Route, Link
  } from 'react-router-dom';

import Countries from './countries/Countries';
import Events from './events/Events';
import Home from './Home';
import Sports from './sports/Sports';
import Venues from './venues/Venues';

export default function App() {

    const names = {
        countries: "Countries",
        sports: "Sports",
        events: "Events",
        venues: "Venues",
    }
    return (
        <BrowserRouter>
            <div>
                <Link to="/countries">{names.countries}</Link>
                <Link to="/sports">{names.sports}</Link>
                <Link to="/events">{names.events}</Link>
                <Link to="/venues">{names.venues}</Link>
            </div>
            <h1>Paris 2024 Data</h1>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/countries" element={<Countries name={names.countries}/>} />
                <Route path="/sports" element={<Sports name={names.sports}/>} />
                <Route path="/events" element={<Events name={names.events}/>} />
                <Route path="/venues" element={<Venues name={names.venues}/>} />
            </Routes>
        </BrowserRouter>
    );
}