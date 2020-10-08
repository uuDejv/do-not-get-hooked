import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import PropTypes from "prop-types";

import firebase from "../../firebase";
import Button from "../components/button";
import ResultGraph from "../components/result-graph";

function ActiveQuestion({ questionId }) {
  const [question, setQuestion] = useState({ title: "Mock Question" });

  useEffect(() => {
    const db = firebase.ref(`/questions/${questionId}`);
    db.on("value", (snapshot) => {
      if (snapshot.val() !== question) setQuestion(snapshot.val());
    });
    return () => db.off();
  });

  function handleClick(value) {
    // if (localStorage.getItem(questionId)) {
    //   alert("You have already answered this question");
    //   return null;
    // }
    localStorage.setItem(questionId, true);
    firebase
      .ref(`/questions/${questionId}/answers`)
      .push({ questionId, value });
  }

  if (!question) return "...";
  return (
    <Wrapper>
      <Title>{question?.title}</Title>
      <ResultGraph
        label={question.title}
        results={question.answers}
        size={300}
      />
      <ButtonWrapper>
        <Button label="Ano" onClick={() => handleClick("Ano")} />
        <Button label="Ne" onClick={() => handleClick("Ne")} />
      </ButtonWrapper>
    </Wrapper>
  );
}

ActiveQuestion.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default ActiveQuestion;

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  height: 90%;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: 3em;
  text-align: center;
  color: #fff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  @media only screen and (min-width: 1200px) {
    font-size: 4em;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5%;
  width: 80%;
  @media only screen and (min-width: 1200px) {
    width: 40%;
    button {
      font-size: 2em;
    }
  }
`;
