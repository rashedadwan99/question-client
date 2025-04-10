import React, { useContext, useEffect, useState } from "react";
import CForm from "../../common/form/CForm";
import { Col } from "react-bootstrap";
import { QuestionContext } from "../../..";

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

  const fields = [
    {
      name: "filledAnswer",
      value: answer.filledAnswer,
      label: "Answer",
      type: "textarea",
    },
  ];

  return (
    <Col xs={12} sm={12}>
      <CForm data={answer} setData={setAnswer} fields={fields} />
    </Col>
  );
}

export default Filling;
