import { useEffect, useState } from 'react';
import axios from 'axios';
import Venue from './Venue';

export default function Venues(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:3000/api/venues');
              setData(response.data.data);
          } catch (error) {
              console.error('Error fetching data:', error);
          } finally {
            setLoading(false)
          }
      };

      fetchData();
  }, []);

  if (loading) return <div>Loading data...</div>;

  return (
    <div>
      <h2>{props.name}</h2>
      {data 
        ? data.map(dataItem => (
          <Venue key={dataItem.id} data={dataItem} />
        ))
        : <p>Error fetching data.</p>
      }
    </div>
  )
}