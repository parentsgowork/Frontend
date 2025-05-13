import React from "react";
import styled from "styled-components";

const InfoCard = ({ topic, data, onClick }) => {
    return(
        <CardContainer onClick={() => onClick(card)}>
            <Title>{data.title}</Title>
            <Description>{data.description}</Description>
            <LinkBtn onClick={(e) => {
              e.stopPropagation();
              window.open(data.url, "_blank");
            }}>지원하기</LinkBtn>
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