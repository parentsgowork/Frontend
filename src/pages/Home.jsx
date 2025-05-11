import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import ChatCategorySelector from '../components/Home/ChatCategorySelector';
import exampleImage from '../assets/images/metamong.png'; // 예시 이미지 경로
import { theme } from '../constants/theme';

const Home = () => {
  const serviceSectionRef = React.useRef(null);

  const handleScrollToSection = () => {
    serviceSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <HeroSection>
        {/* <Spacer /> */}
        <Title>다시 일해!</Title>
        <Subtitle>
          중장년층을 위한 스마트한 구직 플랫폼 선택 기반의 직관적인 챗봇 서비스로 <br />
          새로운 커리어의 시작을 도와드립니다.
        </Subtitle>
        <CTAButton onClick={handleScrollToSection}>서비스 살펴보기</CTAButton>
        <Cards>
          <Card>
            <Icon>🤖</Icon>
            <CardTitle>쉬운 선택형 챗봇</CardTitle>
            <CardDesc>복잡한 입력 없이 버튼 선택만으로 원하는 정보를 찾을 수 있습니다.</CardDesc>
          </Card>
          <Card>
            <Icon>🎯</Icon>
            <CardTitle>맞춤형 추천</CardTitle>
            <CardDesc>경력과 선호도를 고려한 일자리와 교육 과정을 추천해드립니다.</CardDesc>
          </Card>
          <Card>
            <Icon>🛠</Icon>
            <CardTitle>통합 지원 서비스</CardTitle>
            <CardDesc>구직부터 복지, 교육까지 필요한 모든 정보를 한 곳에서 제공합니다.</CardDesc>
          </Card>
        </Cards>
      </HeroSection>

      {/* Horizontal Scroll Section */}
      <HorizontalWrapper ref={serviceSectionRef}>
        {[
          {
            label: '쉽게 선택하며 찾는 구직 정보',
            desc: '복잡한 구직 과정, 이제 간단한 선택만으로 해결하세요. 중장년층을 위한 맞춤형 일자리 정보를 대화하듯 쉽게 찾아드립니다.',
            bullets: ['✅ 선택형 버튼으로 쉽게 검색', '✅ 지역별, 직종별 맞춤 정보', '✅ 중장년층 친화 기업 정보'],
            dot: 0,
          },
          {
            label: '간단한 선택으로 만나는 맞춤 일자리',
            desc: '당신의 경력과 선호도에 맞는 일자리를 AI가 찾아드립니다. 복잡한 검색 없이 몇 가지 질문에 답하면 끝!',
            bullets: ['✅ AI 기반 맞춤형 추천', '✅ 근무 시간대 맞춤 검색', '✅ 통근 거리를 고려한 추천'],
            dot: 1,
            bg: '#f0f4ff',
          },
          {
            label: '클릭 한 번으로 알아보는 복지 혜택',
            desc: '중장년층을 위한 다양한 복지 혜택과 지원 제도를 쉽게 확인하세요. 나에게 해당되는 혜택만 골라서 안내해드립니다.',
            bullets: ['✅ 중장년 특화 복지 정보', '✅ 재취업 지원금 안내', '✅ 신청 방법 단계별 안내'],
            dot: 2,
          },
          {
            label: '나에게 맞는 교육과정 찾기',
            desc: '새로운 직무에 도전하거나 역량을 강화하고 싶으신가요? 중장년층을 위한 맞춤형 교육과정을 쉽게 찾아보세요.',
            bullets: ['✅ 무료 직업 교육 과정', '✅ 디지털 역량 강화 교육', '✅ 자격증 취득 과정 안내'],
            dot: 3,
            bg: '#f0f4ff',
          },
          {
            label: '대화하듯 작성하는 이력서',
            desc: '어려운 자기소개서, 이제 대화하듯 쉽게 작성하세요. 질문에 답하기만 하면 전문적인 이력서가 완성됩니다.',
            bullets: ['✅ 경력 중심 이력서 작성', '✅ 강점 부각 자기소개서', '✅ 완성된 문서 다운로드'],
            dot: 4,
          },
        ].map((item, idx) => (
          <Section key={idx} style={item.bg ? { background: item.bg } : {}}>
            <ChatbotInfo>
              <ImageBox>
                <img src={exampleImage} alt="예시 이미지" />
              </ImageBox>
              <TextBox>
                <ChatLabel>{item.label}</ChatLabel>
                <ChatDesc>{item.desc}</ChatDesc>
                {item.bullets.map((b, i) => (
                  <Bullet key={i}>{b}</Bullet>
                ))}
              </TextBox>
              <ImageBox>
                <ChatCategorySelector dot={item.dot} />
              </ImageBox>
            </ChatbotInfo>
          </Section>
        ))}
      </HorizontalWrapper>

      {/* Footer */}
      <FooterSection>
        <Footer />
      </FooterSection>
    </PageWrapper>
  );
};

export default Home;


const PageWrapper = styled.div`
  height: 100vh;
`;

const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(to bottom right, #f5f8ff, #e0ecff);
`;

const Spacer = styled.div`
  height: 100px;
`;

const HorizontalWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  height: 100vh;
  width: 100vw;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Section = styled.section`
  flex: none;
  width: 100vw;
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterSection = styled.section`
  height: auto;
  background: #fafafa;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-family: 'Bold';
  color: #1a3ec6;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  font-family: 'Regular';
  line-height: 1.6;
  color: #333;
  margin-bottom: 2rem;
`;

const CTAButton = styled.button`
  background-color: #1a3ec6;
  color: white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-family: 'Regular';
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #1242ad;
  }
`;

const Cards = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  padding: 3rem 2rem;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 260px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Icon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-family: 'Bold';
  color: #1a3ec6;
  margin-bottom: 0.5rem;
`;

const CardDesc = styled.p`
  font-size: 1rem;
  font-family: 'Regular';
  color: #444;
`;

const ChatbotInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ImageBox = styled.div`
  max-width: 300px;
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    object-fit: contain; /* or cover */
  }
`;

const TextBox = styled.div`
  max-width: 400px;
  text-align: left;
`;

const ChatLabel = styled.h2`
  color: #1a3ec6;
  font-size: 1.4rem;
  font-family: 'Bold';
  margin-bottom: 1rem;
`;

const ChatDesc = styled.p`
  font-size: 1rem;
  font-family: 'Regular';
  color: #333;
  margin-bottom: 1.5rem;
`;

const Bullet = styled.p`
  font-size: 0.95rem;
  font-family: 'Regular';
  margin: 0.25rem 0;
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  ${({ left }) => left && 'left: 16px;'}
  ${({ right }) => right && 'right: 16px;'}
  transform: translateY(-50%);
  background: rgba(255,255,255,0.8);
  border: none;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 0 10px rgba(0,0,0,0.15);

  &:hover {
    background: #e0ecff;
  }
`;
