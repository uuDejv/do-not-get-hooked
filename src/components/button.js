import React from "react";
import styled from "@emotion/styled";

const Button = (props) => <StyledButton {...props}>{props.label}</StyledButton>;

export default Button;

const StyledButton = styled.button`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: inline-block;
  font-size: 1em;
  padding: 1em 2em;
  -webkit-appearance: none;
  appearance: none;
  background-color: #ff0081;
  color: #fff;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
  box-shadow: 0 2px 25px rgba(255, 0, 130, 0.5);
  &:focus {
    outline: 0;
  }
  &:active {
    transform: scale(0.9);
    background-color: darken(#ff0081, 5%);
    box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
  }
`;
