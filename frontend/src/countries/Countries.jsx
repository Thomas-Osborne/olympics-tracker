import { useEffect, useState } from 'react';
import axios from 'axios';
import Country from './Country';

export default function Countries(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:3000/api/countries');
              setData(response.data);
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
                    <Country key={dataItem.id} data={dataItem} />
                ))
                : <p>Error fetching data.</p>
            }
    </div>
  )
}