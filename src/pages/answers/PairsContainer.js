import { Grid } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
function PairsContainer({ data: pairs, handleDelete }) {
  return (
    <Grid size={12} mb={2}>
      <Row className="justify-conteent-center">
        {pairs.map((d, i) => {
          return (
            <Col key={i} xs={12} sm={12} md={6} className="matching-pairs my-2">
              <div className="left-pair">{d.left}</div>
              <span
                style={{
                  textAlign: "center",
                  width: "100%",
                  alignItems: "center",
                  display: "inline-block",
                }}
              >
                <ArrowUpwardIcon />
                <span>is matching with</span>
              </span>
              <div className="right-pair">{d.right}</div>
             
            </Col>
          );
        })}
      </Row>
    </Grid>
  );
}

export default PairsContainer;
