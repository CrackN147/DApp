import React from "react";
import {EvaluationButton} from "../components";
const EntryView = (props:any) => {
  const { item, loadData, special } = props;
  return (
    <div className={`rounded-5 p-3 d-flex flex-column entry-view ${special ? 'special' : ''}`} onClick={loadData}>
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
          autoSave: false
        }} />
      }
    </div>
  );
};
export default EntryView;