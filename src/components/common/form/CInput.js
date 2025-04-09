import React, { memo, useRef, useState } from "react";
import { Col, Form, InputGroup } from "react-bootstrap";

const CInput = memo(
  ({ icon, label, id, onClick, type, validate, onChange, ...rest }) => {
    const [validMessage, setValivdMessage] = useState(null);
    const timeRef = useRef(null);

    const handleShowTimePicker = (e) => {
      e.preventDefault();
      if (type === "time" && timeRef.current) {
        timeRef.current.showPicker
          ? timeRef.current.showPicker()
          : timeRef.current.focus();
      }
    };
    const handleClick = () => {
      return onClick
        ? onClick
        : (e) => {
            return e.preventDefault;
          };
    };
    const handleChange = async (e) => {
      if (validate) {
      } else onChange(e);
    };
    return (
      <Form.Group as={Col} controlId={id} onClick={handleClick}>
        {label && <Form.Label>{label}</Form.Label>}
        <InputGroup size="sm" className="mb-2" onClick={handleShowTimePicker}>
          <InputGroup.Text id="inputGroup-sizing-sm">{icon}</InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            type={type}
            ref={timeRef}
            onChange={handleChange}
            {...rest}
            autoComplete="true"
          />
        </InputGroup>
        {validMessage && (
          <Form.Control.Feedback type="invalid">
            {validMessage}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    );
  }
);

export default CInput;
