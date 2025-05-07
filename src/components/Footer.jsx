import React from 'react';
import styled from 'styled-components';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaYoutube, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <Column>
          <Title>다시 일해!</Title>
          <Item>중장년층을 위한 맞춤형 구직 플랫폼으로 새로운 시작을 응원합니다.</Item>
        </Column>
        <Column>
          <Title>서비스</Title>
          <Item>구직 정보</Item>
          <Item>맞춤형 추천</Item>
          <Item>복지 정보</Item>
          <Item>교육 과정</Item>
        </Column>
        <Column>
          <Title>지원</Title>
          <Item>자주 묻는 질문</Item>
          <Item>이용 가이드</Item>
          <Item>고객 센터</Item>
          <Item>개인정보처리방침</Item>
        </Column>
        <Column>
          <Title>연락처</Title>
          <ContactItem><FaPhone /> 1588-1234</ContactItem>
          <ContactItem><FaEnvelope /> help@dasi-ilhae.kr</ContactItem>
          <ContactItem><FaMapMarkerAlt /> 서울시 강남구 테헤란로 123</ContactItem>
        </Column>
      </FooterTop>
      <FooterBottom>
        <Copy>© 2025 다시 일해! 모든 권리 보유.</Copy>
        <SocialIcons>
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaYoutube /></a>
        </SocialIcons>
        <TopButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <FaArrowUp />
        </TopButton>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  background-color: #1a3ec6;
  color: white;
  font-family: 'Regular', sans-serif;
  padding: 3rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
`;

const Column = styled.div`
  flex: 1;
  min-width: 180px;
`;

const Title = styled.h4`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Item = styled.p`
  margin: 0.3rem 0;
  font-size: 0.9rem;
  cursor: pointer;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const FooterBottom = styled.div`
  border-top: 1px solid #2e52cc;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
`;

const Copy = styled.div`
  font-size: 0.85rem;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.2rem;

  a {
    color: white;
    text-decoration: none;

    &:hover {
      color: #dcdcdc;
    }
  }
`;

const TopButton = styled.button`
  background-color: #2e52cc;
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  cursor: pointer;
  color: white;
  font-size: 1rem;

  &:hover {
    background-color: #4469e3;
  }
`;


