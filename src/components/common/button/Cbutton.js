import React from "react";
import { Spinner } from "react-bootstrap";
import "./cbutton.css";
function Cbutton({ children, variant, loading, className, ...rest }) {
  return (
    <button
      className={`button ${variant ?? "primary"} ${className ? className : ""}`}
      disabled={loading}
      {...rest}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

export default Cbutton;
