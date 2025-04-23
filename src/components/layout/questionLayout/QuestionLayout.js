import React, { useCallback, useContext, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import Cimg from "../../common/img/Cimg";
import Qimg from "../../../assets/images/woman.png";
import Stepper from "../../stepper/Stepper";
import Cbutton from "../../common/button/Cbutton";
import { QuestionContext } from "../../..";
import "./questionLayout.css";
import DomParser from "../../common/dom-parser/DomParser";
import { Toast } from "../../common/toast/Toast";
import { sendAllAnswers } from "../../../services/questionService";
import TextToSpeech from "../../common/text-speech/TextToSpeech";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../../routes/routes";
function QuestionLayout() {
  const { questions, questionIndex, setQuestionIndex } =
    useContext(QuestionContext);
  const [data, setData] = useState([]);
  const [next, setNext] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [animationName, setAnimationName] = useState("");
  const currentQuestion = questions[questionIndex];
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHomePage = pathname === routes.homeRoute;
  const onClickNext = useCallback(
    async (doSubmit) => {
      if (!questionIndex && isHomePage) {
        if (!currentQuestion?.name || !currentQuestion?.universityNumber) {
          return Toast("error", "please fill all fields");
        }
      }

      if (doSubmit) {
        try {
          setIsSending(true);
          const { data: response } = await sendAllAnswers([
            {
              name: questions[0]?.name,
              universityNumber: questions[0].universityNumber,
            },
            ...data,
          ]);
          Toast("success", response.message);

          setIsSending(false);
          setTimeout(() => {
            navigate(routes.answers, { replace: true });
            setQuestionIndex(0);
          }, [1000]);
        } catch (error) {
          setIsSending(false);
        }
      } else {
        setNext(1);
        setAnimationName("to-left");
        setTimeout(() => {
          setQuestionIndex(questionIndex + 1);
          setAnimationName("");
        }, [500]);
      }
    },
    [data, questionIndex, setQuestionIndex, currentQuestion]
  );
  const onClickBack = useCallback(() => {
    setNext(0);
    setAnimationName("to-right");
    setTimeout(() => {
      setQuestionIndex(questionIndex - 1);
      setAnimationName("");
    }, [500]);
  }, [questionIndex, setQuestionIndex]);

  const componentProps = {
    question: currentQuestion,
    animationName,
    data,
    setData,
  };

  const QuestionComponent = currentQuestion?.component;
  return (
    <Row className="justify-content-between align-items-start px-1">
      <Col xs={12} sm={12} md={12} lg={6} className="my-3">
        <Cimg src={Qimg} alt="woman" className="woman-img" />
        <Stepper {...{ questions, questionIndex, next }} />
      </Col>
      <Col xs={12} sm={12} md={12} lg={6}>
        <Row className="justify-content-center">
          <DomParser
            htmlResponse={questions[questionIndex]?.content}
            className="mb-2"
          />
          {isHomePage && (
            <TextToSpeech htmlString={questions[questionIndex]?.content} />
          )}
          <Stack
            className={`mb-3 justify-content-center align-items-start ${animationName}`}
          >
            {QuestionComponent && <QuestionComponent {...componentProps} />}
          </Stack>
          <Stack
            direction="horizontal"
            className="justify-content-between stack-buttons"
          >
            {questionIndex ? (
              <Cbutton onClick={onClickBack} disabled={isSending}>
                back
              </Cbutton>
            ) : (
              <></>
            )}
            {questionIndex !== questions.length - 1 ? (
              <Cbutton variant="secondary" onClick={() => onClickNext(false)}>
                next
              </Cbutton>
            ) : (
              isHomePage && (
                <Cbutton
                  variant="secondary"
                  onClick={() => onClickNext(true)}
                  loading={isSending}
                >
                  submit
                </Cbutton>
              )
            )}
          </Stack>
        </Row>
      </Col>
    </Row>
  );
}

export default QuestionLayout;
