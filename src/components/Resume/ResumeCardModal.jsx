import React, { useEffect } from "react";
import styled from "styled-components";
import Loader from "../Loader";

const ResumeCardModal = ({ card, onClose }) => {

    useEffect(() => {
    console.log("CardModal mounted");
    console.log("Card:", card);
    return () => {
        console.log("CardModal unmounted");
    };
    }, []);


  return (
    <ModalOverlay>
      <ModalBody>
        <CloseBtn onClick={onClose}>×</CloseBtn>
          <h2>{card.title}</h2>
          
          {card.sections && Object.entries(card.sections).map(([sectionTitle, content]) => (
            <SectionBlock key={sectionTitle}>
              <h4>{sectionTitle}</h4>
              <p>
                {content.split("\n").map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </SectionBlock>
          ))}
      </ModalBody>
    </ModalOverlay>
  );
};

export default ResumeCardModal;

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
  width: 480px;        /* 고정 너비 */
  height: 600px;       /* 고정 높이 (원하는 값으로 조정 가능) */
  overflow-y: auto;    /* 세로 스크롤 */
  position: relative;
`;


const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: -5px;
  right: -15px;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const ApplyBtn = styled.button`
  flex: 1;
  padding: 12px 0;
  background: #1a3ec6;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #1242ad;
  }
`;

const BookmarkBtn = styled.button`
  flex-shrink: 0;
  padding: 12px 16px;
  background: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #e0e0e0;
  }
`;

const SectionBlock = styled.div`
  margin-top: 24px;

  h4 {
    margin-bottom: 8px;
    font-size: 1.1rem;
    color: #1a3ec6;
  }

  p {
    white-space: pre-wrap;
    line-height: 1.5;
  }
`;
