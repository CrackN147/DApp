import React, {useEffect, useState} from 'react';
import storage from 'global/storage';
import config from 'global/config';
import { EntryEdit, EntryView } from './components';
const Home = () => {
  let st = storage();
  const [data, setData] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const getData = () => {
      if (st.exists(config.STATIC.STORAGE)) {
        setData(st.getJson(config.STATIC.STORAGE));
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <h1 className='text-center p-1'>Diary</h1>
      <EntryEdit {...{
        active,
      }}/>
    </div>
  );
}

export default Home;