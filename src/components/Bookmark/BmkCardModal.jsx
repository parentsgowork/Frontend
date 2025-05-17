import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "../Loader";

const BmkCardModal = ({ topic, category, card, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    console.log("CardModal mounted");
    console.log("Topic:", topic);
    console.log("Category:", category);
    console.log("Card:", card);
    return () => {
        console.log("CardModal unmounted");
    };
    }, []);

    const handleApplyClick = () => {
    if (card.url) {
        window.open(card.url, "_blank");
    }
    };

  return (
    <ModalOverlay>
      <ModalBody>
        {isLoading && <Loader message="북마크 삭제 중..."/>}
        <CloseBtn onClick={onClose}>×</CloseBtn>
        {topic === "job" && (
          <>
            <h2>{card.title}</h2>
            <p>{card.content}</p>
          </>
        )}

        {topic === "education" && (
          <>
            <h2>{card.title}</h2>
            {/* <p>{card.url}</p> */}
          </>
        )}  
        {topic === "policy" && (
          <>
            <h2>{card.title}</h2>
            {/* <p>{card.url}</p> */}
          </>
        )}
        
        {/* 지원하기 및 북마크 버튼 */}
        <ButtonGroup>
          <ApplyBtn onClick={handleApplyClick}>지원하기</ApplyBtn>
        </ButtonGroup>
      </ModalBody>
    </ModalOverlay>
  );
};

export default BmkCardModal;

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
  width: 480px; /* 고정 너비 */
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
