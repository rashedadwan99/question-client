import React, { useContext, useEffect, useState } from "react";
import CForm from "../../common/form/CForm";
import { Col } from "react-bootstrap";
import { QuestionContext } from "../../../context/QuestionProvider";

function FirstForm() {
  const { setQuestions, questions } = useContext(QuestionContext);
  const index = 0;

  const [studentData, setStudentData] = useState({
    questionId: questions[index]?._id || "",
    name: questions[index]?.name || "",
    universityNumber: questions[index]?.universityNumber || "",
  });

  useEffect(() => {
    if (!questions[index]) return;

    setQuestions((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        name: studentData.name,
        universityNumber: studentData.universityNumber,
      };
      return updated;
    });
  }, [studentData]);

  const fields = [
    {
      name: "name",
      label: "Name",
      value: studentData.name,
    },
    {
      name: "universityNumber",
      label: "Student ID",
      value: studentData.universityNumber,
    },
  ];

  return (
    <Col xs={12}>
      <CForm data={studentData} setData={setStudentData} fields={fields} />
    </Col>
  );
}

export default FirstForm;
