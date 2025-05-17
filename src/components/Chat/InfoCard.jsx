import React, {useEffect} from "react";
import styled from "styled-components";
import { FiEdit2, FiTrash2 } from "react-icons/fi"; 

const InfoCard = ({ topic, category, data, onClick}) => {
    useEffect(() => {
        console.log("InfoCard mounted");
        console.log("Topic:", topic);
        console.log("Category:", category);
        console.log("Data:", data);
        return () => {
            console.log("InfoCard unmounted");
        };
    }, []);

   const handleCardClick = () => {
      onClick(data);
   }

   const handleButtonClick = (e) => {
      e.stopPropagation();
      window.open(data.url, "_blank");
    }

    return(
        <CardContainer onClick={handleCardClick}>

            {topic === "채용 정보" && (
              <>
                <Title>{data.company_name}</Title>
                <Description>{data.job_title}</Description>
                <Description>{data.deadline}</Description>
                <Description>{data.description}</Description>
                <Description>{data.location}</Description>
                <Description>{data.pay}</Description>
                <Description>{data.registration_date}</Description>
                <Description>{data.time}</Description>

              </>
            )}

            {topic === "교육 정보" && (
              <>
                <Title>{data.title}</Title>
                <Description>{data.reg_start_date}</Description>
                <Description>{data.reg_end_date}</Description>
                <Description>{data.course_start_date}</Description>
                <Description>{data.course_end_date}</Description>
                <Description>{data.hour}</Description>
                <Description>{data.status}</Description>
              </>
            )}

            {topic === "고용정책/복지 정보" && (
              <>
                <Title>{data.title}</Title>
                <Description>{data.description}</Description>
              </>
            )}


            <LinkBtn
              onClick={handleButtonClick}
            >
              지원하기
            </LinkBtn>
        </CardContainer>
    )
}

export default InfoCard;

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
