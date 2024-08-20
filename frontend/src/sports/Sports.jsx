import { useEffect, useState } from 'react';
import axios from 'axios';
import Sport from './Sport';

export default function Sports(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:3000/api/sports');
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
                    <Sport key={dataItem.id} data={dataItem} />
                ))
                : <p>Error fetching data.</p>
            }
    </div>
  )
}