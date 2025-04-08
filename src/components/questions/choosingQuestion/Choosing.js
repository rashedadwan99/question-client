import React, { useContext, useEffect, useState } from "react";
import "./choosing.css";
import Cimg from "../../common/img/Cimg";
import CheckImg from "../../../assets/images/Check.gif";
import { QuestionContext } from "../../..";
function Choosing({ question, data, setData, animationName }) {
  const { questionIndex } = useContext(QuestionContext);
  const [selectedChoice, setSelectedChoice] = useState("");
  const handleChoosing = (c) => {
    const updatedData = data.filter((d) => d.qId !== question.id);
    setSelectedChoice(c.text);
    const obj = { question: question._id, selectedChoice: c.text };
    setData([...updatedData, obj]);
  };
  const handleIsSelected = (c) => selectedChoice === c.text;
  useEffect(() => {
    setSelectedChoice(data[questionIndex]?.selectedChoice);
  }, [data, questionIndex]);
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
