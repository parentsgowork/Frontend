// src/components/Chat/LoadingOverlay.jsx
import React from "react";
import styled, { keyframes } from "styled-components";

const Loader = ({ message }) => {
  return (
    <Overlay>
      <Spinner />
      <Message>{message}</Message>
    </Overlay>
  );
};

export default Loader;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #1a3ec6;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Message = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: #333;
`;
