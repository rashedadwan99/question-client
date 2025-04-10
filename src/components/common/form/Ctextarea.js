import React from "react";
import { Form } from "react-bootstrap";

function TextArea({ label, placeholder, ...rest }) {
  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        as="textarea"
        rows={5}
        {...rest}
        placeholder={placeholder}
      />
    </Form.Group>
  );
}

export default TextArea;
