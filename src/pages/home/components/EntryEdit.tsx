import React from "react";
import config from "global/config";
import { DateMoment } from "components";
import { EvaluationButton } from "../components";
const EntryEdit = (props:any) => {
  const { active, autoSave } = props;
  return (
    <div className="border rounded-5 p-3 d-flex flex-column">
      <DateMoment {...{
        date: new Date(), 
        format: 'dddd'
      }} />
      <textarea className="w-50 m-auto form-control border-0 p-2 resize-none" cols={20} rows={8} 
        name="text"
        placeholder="აღწერა" 
        value={active?.text ?? ''}
        onChange={autoSave}>
      </textarea>
      <div className="d-flex flex-row align-items-center m-auto mt-2">
        {[...Array(config.STATIC.EVALUATIONS)].map((_, i) => (
          <EvaluationButton key={`evaluation-switch-${i}`} {...{ 
            active: active?.evaluation === (i + 1),
            autoSave,
            index: i + 1
          }} />
        ))}
      </div>
    </div>
  );
};
export default EntryEdit;