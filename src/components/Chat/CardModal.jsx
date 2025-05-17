import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { bookmarkJob } from "../../api/feature/Bookmark/bookmarkJob";
import { bookmarkEducation } from "../../api/feature/Bookmark/bookmarkEducation";
import { bookmarkPolicy } from "../../api/feature/Bookmark/bookmarkPolicy";
import Loader from "../Loader";

const CardModal = ({ topic, category, card, onClose }) => {
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

  const handleBookmarkClick = async () => {
    setIsLoading(true);
    try {
      if(topic === "채용 정보") {
        const jobInfos = [{title: card.job_title, content: card.description }];
        await bookmarkJob(jobInfos);
      } else if(topic === "교육 정보") {
        const bookmarks = [{title: card.title, url: card.url}];
        await bookmarkEducation(bookmarks);
      } else if(topic === "고용정책/복지 정보") {
        const policies = [{title: card.title,category: category, description: card.description, url: card.url}];
        await bookmarkPolicy(policies);
      }

      alert("북마크가 저장되었습니다.");
    } catch (error) {
      console.error("북마크 저장 실패:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ModalOverlay>
      <ModalBody>
        {isLoading && <Loader message="북마크 저장 중..."/>}
        <CloseBtn onClick={onClose}>×</CloseBtn>
        {topic === "채용 정보" && (
          <>
            <h2>{card.company_name}</h2>
            <p>{card.job_title}</p>
            <p>{card.deadline}</p>
            <p>{card.description}</p>
            <p>{card.location}</p>
            <p>{card.pay}</p>
            <p>{card.registration_date}</p>
            <p>{card.time}</p>
          </>
        )}

        {topic === "교육 정보" && (
          <>
            <h2>{card.title}</h2>
            <p>{card.reg_start_date}</p>
            <p>{card.reg_end_date}</p>
            <p>{card.course_start_date}</p>
            <p>{card.course_end_date}</p>
            <p>{card.hour}</p>
            <p>{card.status}</p>
          </>
        )}  
        {topic === "고용정책/복지 정보" && (
          <>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </>
        )}
        
        {/* 지원하기 및 북마크 버튼 */}
        <ButtonGroup>
          <ApplyBtn onClick={handleApplyClick}>지원하기</ApplyBtn>
          <BookmarkBtn onClick={handleBookmarkClick}>북마크</BookmarkBtn>
        </ButtonGroup>
      </ModalBody>
    </ModalOverlay>
  );
};

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
