import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import firebase from "../../firebase";
import Button from "../components/button";
import ResultGraph from "../components/result-graph";

function QuestionManager({ questionId }) {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    const db = firebase.ref(`/questions`);
    db.on("value", (snapshot) => {
      if (snapshot.val() !== questionList) setQuestionList(snapshot.val());
    });
    return () => db.off();
  });

  function renderQuestionItem(question, key) {
    return (
      <QuestionItem
        active={questionId === key}
        onClick={() => firebase.ref(`/activeQuestion`).set(key)}
      >
        {question.title}
        <ResultGraph
          label={question.title}
          results={question.answers}
          size={60}
        />
      </QuestionItem>
    );
  }

  return (
    <Wrapper>
      <Toolbar>
        <Button
          label="Add new question"
          onClick={() => firebase.ref(`/questions`).push({ title: "Todo:" })}
        />
      </Toolbar>
      <QuestionWrapper>
        {questionList &&
          Object.keys(questionList).map((key) =>
            renderQuestionItem(questionList[key], key)
          )}
      </QuestionWrapper>
    </Wrapper>
  );
}

QuestionManager.propTypes = {
  questionId: PropTypes.string.isRequired,
};

export default QuestionManager;

const Wrapper = styled.div`
  display: flex;
  width: 80%;
  height: 90%;
  flex-direction: column;
`;
const QuestionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const QuestionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ active }) => (active ? "lightblue" : "#fff")};
  margin: 4px;
  padding: 8px;
  border-radius: 8px;
  flex: 1;
  min-width: 15vw;
  min-height: 5vw;
  &:active {
    transform: scale(0.95);
  }
`;
const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
`;
