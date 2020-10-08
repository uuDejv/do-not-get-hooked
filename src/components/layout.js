import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

import firebase from "../../firebase";
import ActiveQuestion from "../routes/active-question";
import QuestionManager from "../routes/question-manager";

const Layout = () => {
  const [questionId, setQuestionId] = useState(null);

  useEffect(() => {
    const db = firebase.ref(`/activeQuestion`);
    db.on("value", (snapshot) => {
      if (snapshot.val() !== questionId) setQuestionId(snapshot.val());
    });
    return () => db.off();
  });
  if (localStorage.getItem("isAdmin") === "true") {
    return (
      <Wrapper>
        <QuestionManager questionId={questionId} />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <ActiveQuestion questionId={questionId} />
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #da4453;
  background: linear-gradient(to right, #89216b, #da4453);
  background: -webkit-linear-gradient(to right, #89216b, #da4453);
  display: flex;
  align-items: center;
  justify-content: center;
`;
