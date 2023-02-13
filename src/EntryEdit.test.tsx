import React from 'react';
import { render, screen } from '@testing-library/react';
import moment from 'moment';
import config from 'global/config';

const processDateFormat = (date:string) => {
  let curentDate = moment(date, "DD.MM.YYYY").isoWeekday(1);
  let today = moment();
  let dif = today.diff(curentDate, 'days');
  let currentWeek = today.startOf('week').isoWeekday(1);
  let format;
  if (dif > 7) {
    if (dif > 365) {
      format = 'DD MMMM YYYY';
    } else {
      format = 'DD MMMM';
    }
  } else if (currentWeek.isAfter(curentDate)) {
    format = 'DD MMMM';
  } else {
    format = 'dddd';
  }
  moment.updateLocale(config.STATIC.LANG, {
    months : 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
    weekdays : "კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),
  });

  let dateISO = moment(date, "DD.MM.YYYY").toISOString();
  let result = moment(dateISO).locale(config.STATIC.LANG).format(format ? format : "DD.MM.YYYY");
  return result;
}

describe('checkInputDate', () => {
  const list = [
    {date: '14.02.2023', expected: 'სამშაბათი'},
    {date: '12.02.2022', expected: '12 თებერვალი 2022'},
    {date: '12.03.2021', expected: '12 მარტი 2021'},
    {date: '13.02.2023', expected: 'ორშაბათი'},
    {date: '10.02.2023', expected: '10 თებერვალი'},
    {date: '9.01.2023', expected: '09 იანვარი'},
  ]
  list.forEach((item) => {
    it(`should return: ${item.expected} from ${item.date}`, () => {
      const result = processDateFormat(item.date);
      expect(result).toEqual(item.expected);
    });
  });
});