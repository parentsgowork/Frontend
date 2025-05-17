import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FiEdit2, FiTrash2 } from "react-icons/fi"; 
import { getBookmarkedJobById, deleteBookmarkedJob } from "../../api/feature/Bookmark/bookmarkJob";
import { getBookmarkedEducationById, deleteBookmarkedEducation } from "../../api/feature/Bookmark/bookmarkEducation";
import { getBookmarkedPolicyById, deleteBookmarkedPolicy } from "../../api/feature/Bookmark/bookmarkPolicy";
import Loader from "../Loader";

const BmkCard = ({ topic, category, data, onClick}) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("InfoCard mounted");
        console.log("Topic:", topic);
        console.log("Category:", category);
        console.log("Data:", data);
        return () => {
            console.log("InfoCard unmounted");
        };
    }, []);

   const handleCardClick = async () => {
      try {
        let result;
        if(topic === "job") {
            const res = await getBookmarkedJobById(data.id);
            result = res.data.result;
        } else if(topic === "education") {
            const res = await getBookmarkedEducationById(data.id);
            result = res.data.result;
        } else if(topic === "policy") {
            const res = await getBookmarkedPolicyById(data.id);
            result = res.data.result;
        }

        if(result) { onClick(result); }
      } catch (error) {
        console.error("북마크 카드 클릭 중 오류:", error);
      }
   }

   const handleDeleteClick = async (e) => {
      e.stopPropagation();
      try {
        setIsLoading(true);
        if(topic === "job") {
            await deleteBookmarkedJob(data.id);
        } else if(topic === "education") {
            await deleteBookmarkedEducation(data.id);
        } else if(topic === "policy") {
            await deleteBookmarkedPolicy(data.id);
        }
        window.location.reload();
      } catch (error) {
        console.error("북마크 삭제 중 오류:", error);
      }
    }

    return(
        <CardContainer onClick={handleCardClick}>
            {isLoading && <Loader message="북마크 삭제 중..."/>}
            {/* 북마크 페이지 */}
            {topic === "job" && (
              <>
                <Title>{data.title}</Title>
                <Description>{data.content}</Description>
              </>
            )}

            {topic === "education" && (
              <>
                <Title>{data.title}</Title>
                <Description>{data.url}</Description>
              </>
            )}

            {topic === "policy" && (
              <>
                <Title>{data.title}</Title>
                <Description>{data.url}</Description>
              </>
            )}

            <BookmarkFooter onClick={(e) => e.stopPropagation()}>
                <span>저장됨</span>
                <IconGroup>
                  {/* <IconBtn><FiEdit2 /></IconBtn> */}
                  <IconBtn onClick={handleDeleteClick}><FiTrash2 /></IconBtn>
                </IconGroup>
              </BookmarkFooter>

        </CardContainer>
    )
}

export default BmkCard;

const CardContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  background: #fafafa;
  &:hover {
    background: #f0f4ff;
  }
  h4 {
    margin: 0 0 6px 0;
  }
  p {
    margin: 0 0 4px 0;
    font-size: 0.9rem;
  }
  small {
    color: #666;
  }
`;

const Title = styled.h4`
  font-size: 1.2rem;
  font-weight: bold;
  font-family: 'Bold';
  color: #1a3ec6;
`;

const Description = styled.p`
  font-size: 0.9rem;
  font-family: 'Regular';
  color: #333;
`;

const LinkBtn = styled.button`
  width: 100%;
  background: #1a3ec6;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s;
  margin-top: 10px;

  &:hover {
    background: #1877f2;
  }
`;

const BookmarkFooter = styled.div`
  margin-top: 12px;
  background: #f0f0f0;
  border-radius: 8px;
  padding: 8px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #555;
`;

const IconGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const IconBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 1rem;

  &:hover {
    color: #000;
  }
`;
