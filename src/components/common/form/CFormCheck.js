import React from "react";
import { Form } from "react-bootstrap";

function CFormCheck({ label, feedback, feedbackType }) {
  return (
    <Form.Group className="mb-3">
      <Form.Check
        required
        label={label ?? "Agree to terms and conditions"}
        feedback={feedback ?? "You must agree before submitting."}
        feedbackType={feedbackType ?? "invalid"}
      />
    </Form.Group>
  );
}

export default CFormCheck;
