import React, {useEffect, useState} from 'react';
import storage from 'global/storage';
const Home = () => {
  const [data, setData] = useState(null);

  const getData = () => {

  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='container'>
      <h1>Home</h1>
    </div>
  );
}

export default Home;