import React, { useEffect, useState } from "react";
import CForm from "../../common/form/CForm";
import { Col } from "react-bootstrap";

function Filling({ data, setData, question }) {
  const [answer, setAnswer] = useState({
    filledAnswer:
      data.find((d) => d.questionId === question._id)?.filledAnswer || "",
  });

  useEffect(() => {
    const existing = data.find((d) => d.questionId === question._id);
    setAnswer({ filledAnswer: existing?.filledAnswer || "" });
  }, [question._id]);
  useEffect(() => {
    if (answer.filledAnswer === "") return;

    setData((prevData) => {
      const existingIndex = prevData.findIndex(
        (d) => d.questionId === question._id
      );

      if (existingIndex !== -1) {
        const updated = [...prevData];
        updated[existingIndex] = {
          ...updated[existingIndex],
          filledAnswer: answer.filledAnswer,
        };
        return updated;
      }

      return [
        ...prevData,
        { questionId: question._id, filledAnswer: answer.filledAnswer },
      ];
    });
  }, [answer.filledAnswer, question._id, setData]);

  const fields = [
    {
      name: "filledAnswer",
      value: answer.filledAnswer,
      label: "Answer",
    },
  ];

  return (
    <Col xs={12} sm={12}>
      <CForm data={answer} setData={setAnswer} fields={fields} />
    </Col>
  );
}

export default Filling;
