import React from "react";
import styled, { keyframes } from "styled-components";

const Centerloader = styled.div`
  padding-left: 50px;
`;
const spin = keyframes`
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
`;
const Spinner = styled.div`
  border: 6px solid #f3f3f3;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  -webkit-animation: ${spin} 2s linear infinite;
  animation: ${spin} 2s linear infinite;
  border-right: 6px solid #9e9ec7;
  border-left: 6px solid #6464a7;
`;
const Wrapper = styled.div`
  position: absolute;
  top: 45%;
  left: 45%;
`;

const Loader = () => {
  return (
    <Wrapper>
      <Centerloader>
        <Spinner />
        <br />
        Loading ...
      </Centerloader>
    </Wrapper>
  );
};
export default Loader;
