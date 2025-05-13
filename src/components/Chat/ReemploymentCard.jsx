// components/JobCard.jsx
import React from 'react';
import styled from 'styled-components';

const ReemploymentCard = ({ data }) => {
  return (
    <Card>
      <Title>{data.title}</Title>
      <Subtitle>{data.company}</Subtitle>
      <InfoRow>근무지: {data.location}</InfoRow>
      <InfoRow>근무시간: {data.time}</InfoRow>
      <InfoRow>급여: {data.pay}</InfoRow>
      <InfoRow>등록일: {data.registrationDate}</InfoRow>
      <InfoRow>마감일: {data.deadline}</InfoRow>
      <LinkButton href={data.detailUrl} target="_blank" rel="noopener noreferrer">
        상세보기
      </LinkButton>
    </Card>
  );
};

export default ReemploymentCard;


const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 16px;
  margin: 12px 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const Title = styled.h2`
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  margin-bottom: 8px;
  color: #666;
`;

const InfoRow = styled.div`
  margin-bottom: 6px;
  font-size: 14px;
`;

const LinkButton = styled.a`
  display: inline-block;
  margin-top: 12px;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;


