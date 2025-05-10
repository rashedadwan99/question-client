import React, { useContext, useEffect, useState } from "react";
import CForm from "../../common/form/CForm";
import { Col } from "react-bootstrap";
import { QuestionContext } from "../../../context/QuestionProvider";
import { useLocation } from "react-router-dom";
import { routes } from "../../../routes/routes";

function Filling({ data, setData }) {
  const { questions, questionIndex } = useContext(QuestionContext);
  const question = questions[questionIndex];

  const [answer, setAnswer] = useState({ filledAnswer: "" });

  // Sync local answer when question changes
  useEffect(() => {
    const existing = data.find((d) => d.questionId === question._id);
    setAnswer({ filledAnswer: existing?.filledAnswer || "" });
  }, [questionIndex]);

  // Update parent data when answer changes
  useEffect(() => {
    if (!answer.filledAnswer && answer.filledAnswer !== "") return;

    setData((prevData) => {
      const index = prevData.findIndex((d) => d.questionId === question._id);

      if (index !== -1) {
        const updated = [...prevData];
        updated[index] = {
          ...updated[index],
          filledAnswer: answer.filledAnswer,
        };
        return updated;
      } else {
        return [
          ...prevData,
          { questionId: question._id, filledAnswer: answer.filledAnswer },
        ];
      }
    });
  }, [answer.filledAnswer, question._id]);
  const { pathname } = useLocation();
  const isHomePage = pathname === routes.homeRoute;
  const fields = [
    {
      name: isHomePage ? "filledAnswer" : "correctAnswer",
      value: isHomePage ? answer.filledAnswer : question.correctAnswer,
      label: "Answer",
      type: "textarea",
      readOnly: pathname === routes.homeRoute ? false : true,
    },
  ];

  return (
    <Col xs={12} sm={12}>
      <CForm
        data={isHomePage ? answer : question}
        setData={setAnswer}
        fields={fields}
      />
    </Col>
  );
}

export default Filling;
