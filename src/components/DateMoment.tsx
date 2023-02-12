import moment from 'moment'
import config from 'global/config'
const DateMoment = (props:any) => {
	const {date, format, className} = props;

	moment.updateLocale(config.STATIC.LANG, {
		months : 'იანვარი_თებერვალი_მარტი_აპრილი_მაისი_ივნისი_ივლისი_აგვისტო_სექტემბერი_ოქტომბერი_ნოემბერი_დეკემბერი'.split('_'),
		weekdays : "კვირა_ორშაბათი_სამშაბათი_ოთხშაბათი_ხუთშაბათი_პარასკევი_შაბათი".split("_"),
	});

	let dateISO = moment(date).toISOString()
	let result = moment(dateISO).locale(config.STATIC.LANG).format(format ? format : "DD.MM.YYYY");
	return (
    <h3 className={className ?? 'text-center'}>{result}</h3>
  )
};

export default DateMoment;
