import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaSyncAlt } from 'react-icons/fa';

const ChatCategorySelector = ({ dot = 0 }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const helperTextByDot = [
    '일자리 추천',
    '복지 정보',
    '교육 정보',
    '이력서 작성',
  ];

  const questionTextByDot = [
    '사용자 맞춤 일자리를 AI가 찾아왔어요!',
    '관심 있는 복지 분야를 선택해주세요.',
    '희망하는 교육 분야를 선택해주세요.',
    '어떤 경력을 강조하고 싶으신가요?'
  ]

  const helperText = helperTextByDot[dot] || '일자리 추천';
  const question = questionTextByDot[dot] || '어떤 직종을 찾고 계신가요?';

  return (
    <ChatCard>
      <Header>
        <BotIcon>ㅇ</BotIcon>
        <HelperText>{helperText}</HelperText>
      </Header>

      <Question>{question}</Question>

      <ButtonList>
        {dot === 0 ? (
          <>
            <DescriptionCard>
            <DescriptionTitle>💬 AI 설명</DescriptionTitle><b>[다시 일해 복지센터]</b><br/>정서 지원에 능한 <b>요양 보호사를</b> 모집합니다.<br/>오전 <b>10시 30분</b>부터 오후 <b>1:30</b>까지 돌봐야합니다.<br/><b>시급 12000원</b>, 기초 수당 별도 제공
            <br/>서울시 성북구 서경로 일해 빌딩
            <br/><b>2025년 07월 20일까지 모집</b>
            {/*
            <CategoryButton onClick={() => handleNavigate('/chatbot/job')}>다시일해 복지센터</CategoryButton>
            <CategoryButton onClick={() => handleNavigate('/chatbot/job')}>서비스직</CategoryButton>
            <CategoryButton onClick={() => handleNavigate('/chatbot/job')}>기술직</CategoryButton>
            <CategoryButton onClick={() => handleNavigate('/chatbot/job')}>판매직</CategoryButton>
              */}
            </DescriptionCard>
            </>
          
        ):
        dot === 1 ? (
          <>
            <CategoryButton onClick={() => handleNavigate('/chatbot/education/digital')}>디지털 역량 교육</CategoryButton>
            <CategoryButton onClick={() => handleNavigate('/chatbot/education/training')}>직업 훈련</CategoryButton>
            <CategoryButton onClick={() => handleNavigate('/chatbot/education/license')}>자격증 과정</CategoryButton>
            <CategoryButton onClick={() => handleNavigate('/chatbot/education/other')}>기타 교육</CategoryButton>
          </>
        ):
        dot === 2 ? (
          <>
            <CategoryButton onClick={() => handleNavigate('/chatbot/policy/digital')}>디지털 역량 교육</CategoryButton>
            <CategoryButton onClick={() => handleNavigate('/chatbot/policy/training')}>직업 훈련</CategoryButton>
            <CategoryButton onClick={() => handleNavigate('/chatbot/policy/license')}>자격증 과정</CategoryButton>
            <CategoryButton onClick={() => handleNavigate('/chatbot/policy/other')}>기타 교육</CategoryButton>
          </>
        ):
        dot === 3 ? (
          <>
            <CategoryButton onClick={() => handleNavigate('/chatbot/resume')}>관리 및 리더십 경험</CategoryButton>
            <CategoryButton onClick={() => handleNavigate('/chatbot/resume')}>전문 기술 및 자격증</CategoryButton>
            <CategoryButton onClick={() => handleNavigate('/chatbot/resume')}>고객 서비스 경험</CategoryButton>
            <CategoryButton onClick={() => handleNavigate('/chatbot/resume')}>프로젝트 성과</CategoryButton>
          </>
        ) : null}
      </ButtonList>

      <Footer>
        <Restart>
          <FaSyncAlt size={12} />
          다시 시작
        </Restart>
        <DotNav>
            <Dot active={dot >= 0} />
            <Dot active={dot >= 1} />
            <Dot active={dot >= 2} />
            <Dot active={dot >= 3} />
            <Dot active={dot >= 4} />
        </DotNav>
      </Footer>
    </ChatCard>
  );
};

export default ChatCategorySelector;

const ChatCard = styled.div`
  width: 280px;
  background: #F3F4F6;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-family: 'Pretendard', sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const BotIcon = styled.div`
  background-color: #1a73e8;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  padding: 0.4rem 0.6rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const HelperText = styled.span`
  background-color: #E6F0FF;
  color: #1A73E8;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  display: inline-block;
`;


const Question = styled.div`
  font-weight: 500;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  color: #000000;
`;

const ButtonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CategoryButton = styled.button`
  background: white;
  border: 1px solid #cfd8e3;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #e7efff;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`;

const Restart = styled.div`
  font-size: 0.8rem;
  color: #555;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const DotNav = styled.div`
  display: flex;
  gap: 4px;
`;

const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#1a73e8' : '#ccc')};
`;


const DescriptionCard = styled.div`
  background-color: white;
  border: 1px solid #cfd8e3;
  border-radius: 12px;
  padding: 1rem;
  color: #333;
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: pre-wrap;
  transition: background-color 0.2s;

  &:hover {
    background-color:rgb(247, 250, 255);  
  }
`;

const DescriptionTitle = styled.div`
  color: #1a73e8;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;
