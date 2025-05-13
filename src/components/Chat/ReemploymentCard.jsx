import React from 'react';
import styled from 'styled-components';

const ReemploymentCard = ({ data }) => {
  const summary = data.summary || "상세정보가 없습니다.";
  const marketFit = data.market_fit || "상세정보가 없습니다.";
  const score = data.reemployment_score || 0;

  return (
    <Card>
      <ScoreSection>
        <GaugeWrapper>
          <Label>재취업 가능성</Label>
          <Gauge>
            <GaugeFill style={{ transform: `rotate(${(score / 100) * 180}deg)` }} />
          </Gauge>
          <ScoreText>{score}%</ScoreText>
        </GaugeWrapper>
      </ScoreSection>

      <Divider />

      <ResultSection>
        <SectionTitle>분석 결과</SectionTitle>
        <ResultBox color="#eef3ff">
          <ResultTitle>
            재취업 가능성 <span>{score}%</span>
          </ResultTitle>
          <ResultContent>{summary}</ResultContent>
        </ResultBox>

        <ResultBox color="#ebf9f0">
          <ResultTitle>
            시장 적합도 <GreenText>높음</GreenText>
          </ResultTitle>
          <ResultContent>{marketFit}</ResultContent>
        </ResultBox>
      </ResultSection>
    </Card>
  );
};

export default ReemploymentCard;

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const ScoreSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

const GaugeWrapper = styled.div`
  text-align: center;
`;

const Label = styled.div`
  color: #4c6ef5;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 8px;
`;

const Gauge = styled.div`
  width: 120px;
  height: 60px;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  background: #f0f0f0;
  position: relative;
  overflow: hidden;
`;

const GaugeFill = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 120px;
  height: 60px;
  background: #4c6ef5;
  transform-origin: bottom center;
  transform: rotate(0deg);
  transition: transform 0.5s ease-in-out;
`;

const ScoreText = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 12px;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 24px 0;
`;

const ResultSection = styled.div``;

const SectionTitle = styled.h4`
  font-size: 1rem;
  margin-bottom: 16px;
`;

const ResultBox = styled.div`
  background-color: ${(props) => props.color || "#f5f5f5"};
  border-radius: 12px;
  padding: 14px;
  margin-bottom: 12px;
`;

const ResultTitle = styled.div`
  font-weight: bold;
  margin-bottom: 6px;

  span {
    float: right;
    color: #4c6ef5;
  }
`;

const ResultContent = styled.div`
  font-size: 0.9rem;
  color: #333;
`;

const GreenText = styled.span`
  color: #00c471;
  font-weight: bold;
`;
