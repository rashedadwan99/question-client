import React from "react";
import Cimg from "../../common/img/Cimg";
import CheckImg from "../../../assets/images/Check.gif";
import "./choosing.css";
function Choosing({ question, data, setData, animationName }) {
  const handleChoosing = (c) => {
    const updatedData = data.filter((d) => d.questionId !== question._id);
    const obj = { questionId: question._id, selectedChoice: c.text };
    setData([...updatedData, obj]);
  };
  const handleIsSelected = (c) => {
    const currentQuestionData = data.find((d) => d.questionId === question._id);

    return c.text === currentQuestionData?.selectedChoice;
  };

  return (
    <ul>
      {question.choices.map((c, i) => {
        return (
          <li
            className={`list-item ${animationName} ${
              handleIsSelected(c) ? " selected" : ""
            }`}
            style={{ animationDelay: `0.3${i}s` }}
            key={c.text}
            onClick={() => handleChoosing(c)}
          >
            {c.text}
            {handleIsSelected(c) ? (
              <Cimg src={CheckImg} alt="checked" className="check-mark" />
            ) : (
              <></>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default Choosing;
