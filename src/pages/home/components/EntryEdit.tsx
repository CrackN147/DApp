import React from "react";
import config from "global/config";
import { DateMoment } from "components";
import { EvaluationButton } from "../components";
const EntryEdit = (props:any) => {
  const { active } = props;
  return (
    <div className="border rounded-5 p-3 d-flex flex-column">
      <DateMoment {...{
        date: new Date(), 
        format: 'dddd'
      }} />
      <textarea className="w-50 m-auto border" cols={30} rows={10}></textarea>
      <div className="d-flex flex-row align-items-center m-auto mt-2">
        {[...Array(config.STATIC.EVALUATIONS)].map((_, index) => (
          <EvaluationButton {...{ 
            active,
            index
          }} />
        ))}
      </div>
    </div>
  );
};
export default EntryEdit;