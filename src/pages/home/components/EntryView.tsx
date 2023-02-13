import React from "react";
import {EvaluationButton} from "../components";
const EntryView = (props:any) => {
  const { item } = props;
  return (
    <div className="border rounded-5 p-3 d-flex flex-column entry-view">
      <h3>
        {item.date}
      </h3>
      <p>
        {item.text}
      </p>
      {item.evaluation > 0 &&
        <EvaluationButton {...{
          active: item,
          index: item.evaluation,
          autoSave: () => {}
        }} />
      }
    </div>
  );
};
export default EntryView;