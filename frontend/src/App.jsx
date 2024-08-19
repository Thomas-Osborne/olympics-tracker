import { useEffect, useState } from 'react';
import axios from 'axios';

import Country from './countries/Country';

export default function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/countries');
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
              setLoading(false)
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="App">
            <h1>Paris 2024 Data</h1>
            {data 
                ? data.map(dataItem => (
                    <Country key={dataItem.id} data={dataItem} />
                ))
                : <p>Error fetching data.</p>
            }
        </div>
    );
}