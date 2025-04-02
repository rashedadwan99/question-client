import React, { useEffect, useState } from "react";
import "./choosing.css";
import Cimg from "../../common/img/Cimg";
import CheckImg from "../../../assets/images/Check.gif";
function Choosing({ answers = [], question, data, setData, animationName }) {
  const handleChoosing = (ans) => {
    const updatedData = data.filter((d) => d.qId !== question.id);
    const obj = { qId: question.id, ansId: ans.id };
    setData([...updatedData, obj]);
  };
  const handleIsSelected = (ans) =>
    data.find((d) => d.ansId === ans.id && d.qId === question.id);

  return (
    <ul>
      {answers.map((ans, i) => {
        return (
          <li
            className={`multiple-answer ${animationName} ${
              handleIsSelected(ans) ? " selected" : ""
            }`}
            style={{ animationDelay: `0.2${i + 5}s` }}
            key={ans.id}
            onClick={() => handleChoosing(ans)}
          >
            {ans.content}
            {handleIsSelected(ans) ? (
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
