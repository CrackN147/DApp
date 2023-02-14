import React, {useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper";
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
    newActive[name] = value;
    setActive(newActive);
  }

  const processMood = (evaluation:number) => {
    if (evaluation > 0 && document.body.className.indexOf(`mood--${evaluation}`) === -1) {
      document.body.className = '';
      document.body.classList.add(`mood--${evaluation}`);
    }
  }

  const processEntry = (item:any) => {
    if(item.empty) {
      return;
    }
    setActive(item);
    processMood(item.evaluation);
  }

  useEffect(() => {
    if (!active || (!active.text && !active.evaluation)) {
      return () => {};
    }
    const timer = setTimeout(() => {
      let newData = [...data];
      let activeCopy = {...active};
      let index = newData.findIndex((item) => item.date === activeCopy.date);
      delete activeCopy.empty;
      if (index > -1) {
        newData[index] = activeCopy;
      } else {
        newData.push(activeCopy);
      }
      processMood(activeCopy.evaluation);
      newData = newData.filter((item:any) => !item.empty)
      setData(newData);
      st.set(config.STATIC.STORAGE, JSON.stringify(newData));
		}, 500);
		return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  useEffect(() => {
    const generateEmptyData = () => {
      let arr = [];
      for (let i = 0; i < 7; i++) {
        let date = moment(new Date()).subtract(i, 'days').format('DD.MM.YYYY');
        arr.push({
          date,
          text: '',
          evaluation: 0,
          empty: true
        });
      }
      return arr;
    }
    const getInitData = () => {
      let localData;
      let dateNow = moment(new Date()).format('DD.MM.YYYY');
      if (st.exists(config.STATIC.STORAGE)) {
        localData = st.getJson(config.STATIC.STORAGE);
        let index = localData.findIndex((item:any) => item.date === dateNow);
        if (index > -1) {
          setActive(localData[index]);
          processMood(localData[index].evaluation);
        }
      } else {
        localData = generateEmptyData();
        setActive({
          date: dateNow,
          text: '',
          evaluation: 0,
          empty: true
        });
      }
      setData(localData);
    };
    getInitData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <h1 className='text-center p-1'>დღიური</h1>
        {active &&
          <EntryEdit {...{
            active,
            autoSave
          }}/>
        }
      </div>
      <div className='footer'>
      {data.length > 0 && 
        <Swiper
          slidesPerView={7}
          spaceBetween={30}
          centeredSlides={false}
          freeMode={true}
          dir="rtl"
          scrollbar={{ draggable: true }}
          modules={[Scrollbar]}
          mousewheel={true}
          className="mySwiper"
          breakpoints={{
            320: {slidesPerView: 1},
            480: {slidesPerView: 2},
            768: {slidesPerView: 3},
            1024: {slidesPerView: 4},
            1200: {slidesPerView: 5},
            1400: {slidesPerView: 6},
          }}
        >
          <SwiperSlide>
            <EntryView {...{
              item: {
                date: 'ხვალ',
                text: '',
                evaluation: 0
              },
              special: true
            }}/>
          </SwiperSlide>
          {data.map((item:object, i:number) => (
            <SwiperSlide key={i}>
              <EntryView {...{
                item,
                loadData: () => processEntry (item)
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