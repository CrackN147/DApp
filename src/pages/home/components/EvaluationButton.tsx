import React from "react";
const EvaluationButton = (props:any) => {
  const { active, index, autoSave } = props;
  return (
    <div className="p-1 m-1 evaluation">
      <button className={`btn rounded-5 bg-transparent border px-4 py-3 custom--btn ${active ? 'active' : ''} ${!autoSave ? 'disabled' : ''}`}
        name="evaluation"
        value={index}
        onClick={autoSave ? autoSave : null}
      >
        {index}
      </button>
    </div>
  );
};
export default EvaluationButton;