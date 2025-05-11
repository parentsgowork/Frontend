import React from "react";
import styled from "styled-components";

const CardModal = ({ card, onClose }) => {
    return (
    <ModalOverlay>
      <ModalBody>
        <CloseBtn onClick={onClose}>×</CloseBtn>
        <h3>{card.company}</h3>
        <p>{card.position}</p>
        <p>{card.detail}</p>
        <ApplyBtn>지원하기 →</ApplyBtn>
      </ModalBody>
    </ModalOverlay>
  );
}

export default CardModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ModalBody = styled.div`
  background: #fff;
  padding: 32px;
  border-radius: 12px;
  min-width: 320px;
`;
const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;
`;
const ApplyBtn = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 12px 0;
  background: #1a3ec6;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
