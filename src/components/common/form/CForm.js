import React, { memo, useCallback } from "react";
import { Col, Form, Row } from "react-bootstrap";
import CInput from "./CInput";
import { checkRequiredFields } from "../../../validation/validation";
import { Toast } from "../toast/Toast";
import "./form.css";
import Cbutton from "../button/Cbutton";
const CForm = memo(
  ({ data, fields, buttonLabel, variant, setData, doSubmit, loading }) => {
    const handleSubmit = useCallback(
      (event) => {
        event.preventDefault();
        const isAllFilled = checkRequiredFields(fields, data);

        if (isAllFilled) doSubmit(event);
        else Toast("error", "please fill all fields");
      },
      [doSubmit, data, fields]
    );
    const onChange = useCallback(
      (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData((prevData) => ({ ...prevData, [name]: value.trimLeft() }));
      },
      [setData]
    );
    return (
      <center>
        <Form noValidate onSubmit={(e) => e.preventDefault()}>
          <Row className={`mt-2 justify-content-start `}>
            {fields.map((f, i) => {
              return (
                <Col key={i} md={f.md ?? 12} className="my-1">
                  <CInput
                    label={f.label}
                    id={f.id}
                    value={data[f.name]}
                    name={f.name}
                    required={f.required}
                    type={f.type}
                    placeholder={f.placeholder}
                    icon={f.icon}
                    onChange={onChange}
                    min={f.min}
                    max={f.max}
                    onClick={f.onClick}
                    validate={f.validate}
                  />
                </Col>
              );
            })}
          </Row>
          {buttonLabel && (
            <Cbutton onClick={handleSubmit} variant={variant} loading={loading}>
              {buttonLabel}
            </Cbutton>
          )}
        </Form>
      </center>
    );
  }
);

export default CForm;
