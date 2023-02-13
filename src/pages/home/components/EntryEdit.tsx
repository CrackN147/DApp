import React from "react";
import moment from "moment";
import config from "global/config";
import { DateMoment } from "components";
import { EvaluationButton } from "../components";
const EntryEdit = (props:any) => {
  const { active, autoSave } = props;
  const processDateFormat = (date:string) => {
    let curentDate = moment(date, "DD.MM.YYYY").isoWeekday(1);
    let today = moment();
    let dif = today.diff(curentDate, 'days');
    let currentWeek = today.startOf('week').isoWeekday(1);
    // console.log(currentWeek);
    if (dif > 7) {
      if (dif > 365) {
        return 'DD MMMM YYYY';
      } else {
        return 'DD MMMM';
      }
    } else if (currentWeek.isAfter(curentDate)) {
      return 'DD MMMM';
    } else {
      return 'dddd';
    }
  }
  return (
    <div className="border rounded-5 p-3 d-flex flex-column">
      <DateMoment {...{
        date: active.date, 
        format: processDateFormat(active.date)
      }} />
      <textarea className="m-auto form-control border-0 p-2 resize-none" cols={20} rows={8} 
        name="text"
        placeholder="აღწერა" 
        value={active.text ?? ''}
        onChange={autoSave}>
      </textarea>
      <div className="d-flex flex-row align-items-center m-auto mt-2">
        {[...Array(config.STATIC.EVALUATIONS)].map((_, i) => (
          <EvaluationButton key={`evaluation-switch-${i}`} {...{ 
            active: active.evaluation === (i + 1),
            autoSave,
            index: i + 1
          }} />
        ))}
      </div>
    </div>
  );
};
export default EntryEdit;