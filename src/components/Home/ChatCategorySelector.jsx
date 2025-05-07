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
    '챗봇 도우미',
    '맞춤 추천',
    '복지 정보',
    '교육 정보',
    '이력서 작성',
  ];

  const questionTextByDot = [
    '어떤 직종을 찾고 계신가요?',
    '선호하는 근무 형태를 선택해주세요.',
    '관심 있는 복지 분야를 선택해주세요.',
    '희망하는 교육 분야를 선택해주세요.',
    '어떤 경력을 강조하고 싶으신가요?'
  ]

  const helperText = helperTextByDot[dot] || '챗봇 도우미';
  const question = questionTextByDot[dot] || '어떤 직종을 찾고 계신가요?';

  return (
    <ChatCard>
      <Header>
        <BotIcon>ㅇ</BotIcon>
        <HelperText>{helperText}</HelperText>
      </Header>

      <Question>{question}</Question>

      <ButtonList>
        <CategoryButton onClick={() => handleNavigate('/#')}>사무직</CategoryButton>
        <CategoryButton onClick={() => handleNavigate('/#')}>서비스직</CategoryButton>
        <CategoryButton onClick={() => handleNavigate('/#')}>기술직</CategoryButton>
        <CategoryButton onClick={() => handleNavigate('/#')}>판매직</CategoryButton>
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

