import React from "react";
const EvaluationButton = (props:any) => {
  const { active, index } = props;
  return (
    <div className="p-1 m-1">
      <button className="btn rounded-5 bg-transparent border px-4 py-3 custom--btn">
        {index}
      </button>
    </div>
  );
};
export default EvaluationButton;