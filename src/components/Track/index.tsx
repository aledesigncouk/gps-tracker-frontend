import { useEffect, useState } from 'react';

const Track = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/byYear');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  return <div>{data ? JSON.stringify(data) : 'Loading...'}</div>;
}

export default Track;
