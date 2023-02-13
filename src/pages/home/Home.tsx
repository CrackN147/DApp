import React, {useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import moment from 'moment';
import storage from 'global/storage';
import config from 'global/config';
import { EntryEdit, EntryView } from './components';
const Home = () => {
  let st = storage();
  const [data, setData] = useState<any>([]);
  const [active, setActive] = useState<any>(null);

  const autoSave = (e:any) => {
    let name = e.target.name;
    let value = e.target.value;
    let newActive = {...active};
    if (name === 'evaluation') {
      value = parseInt(value);
    }
    // if (active[name] === value) {
    //   return;
    // }
    newActive[name] = value;
    setActive(newActive);
  }

  useEffect(() => {
    if (!active) {
      return () => {};
    }
    const timer = setTimeout(() => {
      let newData = [...data];
      let index = newData.findIndex((item) => item.date === active.date);
      if (index > -1) {
        newData[index] = active;
      } else {
        newData.push(active);
      }
      setData(newData);
      st.set(config.STATIC.STORAGE, JSON.stringify(newData));
		}, 500);
		return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const getInitData = () => {
      let dateNow = moment(new Date()).format('DD.MM.YYYY');
      if (st.exists(config.STATIC.STORAGE)) {
        let localData = st.getJson(config.STATIC.STORAGE);
        let index = localData.findIndex((item:any) => item.date === dateNow);
        if (index > -1) {
          setActive(localData[index]);
        }
        setData(localData);
      } else {
        setActive({
          date: dateNow,
          text: '',
          evaluation: 0
        });
      }
    };
    getInitData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <h1 className='text-center p-1'>Diary</h1>
        <EntryEdit {...{
          active,
          autoSave
        }}/>
      </div>
      <div className='footer'>
      {data.length > 0 && 
        <Swiper
          slidesPerView={7}
          spaceBetween={30}
          centeredSlides={true}
          freeMode={true}
          dir="rtl"
          pagination={{
            clickable: true,
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <EntryView {...{
              item: {
                date: 'ხვალ',
                evaluation: 0
              },
            }}/>
          </SwiperSlide>
          {data.map((item:object, i:number) => (
            <SwiperSlide key={i}>
              <EntryView {...{
                item,
              }}/>
            </SwiperSlide>
          ))}
        </Swiper>
      }
      </div>
    </div>
  );
}

export default Home;