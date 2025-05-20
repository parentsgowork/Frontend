import React, { useState, useRef, useEffect }from "react";
import { useParams, useNavigationType } from "react-router-dom";
import styled from "styled-components";
import useChatStore from "../stores/useChatStore";
import Intro from "../components/Chat/Intro";
import ChatArea from "../components/Chat/ChatArea";
import ReemploymentCard from "../components/Chat/ReemploymentCard";
import InfoCard from "../components/Chat/InfoCard";
import CardModal from "../components/Chat/CardModal";
import Loader from "../components/Loader";

const ChatbotPage =()=> {
    const { topic: topicParam, category: categoryParam } = useParams();  
    const navigationType = useNavigationType();

    const topicMap = {
        job: "채용 정보",
        education: "교육 정보",
        policy: "고용정책/복지 정보",
        resume: "자기소개서",
    };

    const categoryMap = {
      digital: "디지털 역량 교육",
      training: "직업 훈련",
      license: "자격증 과정",
      other: "기타 교육",
    };

    const topicText = topicMap[topicParam];
    const categoryText = categoryMap[categoryParam];
  
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [inputText, setInputText] = useState("");
    const [infoCategory, setInfoCategory] = useState("");

    // 전역 상태
    const topic = useChatStore((s) => s.topic);
    const setTopic = useChatStore((s) => s.setTopic);
    const messages = useChatStore((s) => s.messages);
    const addMessage = useChatStore((s) => s.addMessage);
    const cards = useChatStore((s) => s.cards);
    const modalContent = useChatStore((s) => s.modalContent);
    const openModal = useChatStore((s) => s.openModal);
    const closeModal = useChatStore((s) => s.closeModal);
    const isLoading = useChatStore((s) => s.isLoading);
    const handleReemploymentAnalysis = useChatStore((s) => s.handleReemploymentAnalysis);
    const jobPage = useChatStore((s) => s.jobPage);
    // const handleSearchJobInfo = useChatStore((s) => s.handleSearchJobInfo);
    const handleSearchEducationInfo = useChatStore((s) => s.handleSearchEducationInfo);
    const handleSearchPolicyInfo = useChatStore((s) => s.handleSearchPolicyInfo);
    const rsmSessionId = useChatStore((s) => s.rsmSessionId);
    const rsmPhase = useChatStore((s) => s.rsmPhase);
    const rsmQuestionCategory = useChatStore((s) => s.rsmQuestionCategory);
    const isLast = useChatStore((s) => s.isLast);
    const companyName = useChatStore((s) => s.companyName);
    const positionName = useChatStore((s) => s.positionName);
    const rsmInfo = useChatStore((s) => s.rsmInfo);
    const handleResumeSession = useChatStore((s) => s.handleResumeSession);
    const handleSaveResume = useChatStore((s) => s.handleSaveResume);


    useEffect(() => {
      console.log('topic:', topic);
      console.log('category:', infoCategory);
      console.log('messages:', messages);
      console.log('cards:', cards);
      console.log('modalContent:', modalContent);
      console.log('jobPage:', jobPage);
      console.log('sidebarOpen:', sidebarOpen);
    },[topic, infoCategory, messages, cards, modalContent, jobPage, sidebarOpen]);

    // 채팅 영역 스크롤 참조
    const chatSectionRef = useRef(null);

    // 메세지가 추가될 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        if(chatSectionRef.current) {
            chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
        }
    }, [messages]);

    // 메세지 전송(엔터)
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    }

    // 초기 라우팅 처리
    useEffect(() => {
      if(topicParam && topicText) {
        setTopic(topicText);
        handleOptionClick(topicText, !!categoryParam);
        // console.log('topic:', topic);
      }   
      if (categoryParam && categoryText) {
        setInfoCategory(categoryText);
        // console.log('category:', categoryText);
      }
    }, []);

    // useEffect(() => {
    //   if (navigationType === "POP") {
    //     window.location.reload();
    //   }
    // }, []);

    // 대화 주제 선택
    const handleOptionClick = async (option, isFromUrl = false) => {
        setTopic(option);
        addMessage("user", option);

        // topic에 따른 함수 호출
        switch (option) {
            case "재취업 분석":
                addMessage("bot", "타겟 연령대, 선호하는 직업군을 알려주세요! ex) '50대, 광업, 남성 재취업 가능성이 궁금해.'");
                break;
            case "채용 정보":
                await useChatStore.getState().handleSearchJobInfo(1);
                addMessage("bot", "채용 정보를 불러왔습니다. 사이드 바를 열어서 확인해주세요!");
                break;
            case "교육 정보":
                if(!isFromUrl) {
                  addMessage("bot", "궁금한 교육 정보를 선택해주세요!");
                }
                break;
            case "고용정책/복지 정보":
                if(!isFromUrl) {
                  addMessage("bot", "궁금한 고용 정책/복지 정보를 선택해주세요!");
                }
                break;
            case "자기소개서":
                await handleResumeSession(""); // 자기소개서 세션 바로 호출
                break;
            default:
                break;
        }
    
    }

    // 메세지 전송
    const handleSend = async (text) => {
        const message = text ?? inputText;
        console.log("handleSend - inputText:", message);
        if (message.trim() === "" || !message.trim()) return;
        addMessage("user", message);
        setInputText("");

        // 재취업 분석
        if (
            topic === "재취업 분석" &&
            messages.length > 0 &&
            messages[messages.length - 1].from === "bot" // 재취업 분석 api 바로 호출
        ) {
          await handleReemploymentAnalysis(message); 
        }

        // 자기소개서
        if (topic === "자기소개서") {
          console.log("자기소개서 세션 진행 단계:", rsmPhase);
          await handleResumeSession(message);
        }

        return;
    }

    // 채용 정보 페이지 변경
    useEffect(() => {
        if (topic === "채용 정보" && jobPage !== null) {
          (async () => {
            await useChatStore.getState().handleSearchJobInfo(jobPage);
          })();

        }
    }, [jobPage]);

    // 교육 정보, 고용정책/복지 정보에서 카테고리 선택 시 결과 호출
    useEffect(() => {
      (async () => {
        try{
          // setIsLoading(true);
          if (topic === "교육 정보" && infoCategory) {
              handleSearchEducationInfo(infoCategory);
              addMessage("bot", "교육 정보를 불러왔습니다. 사이드 바를 열어서 확인해주세요!");
          } else if (topic === "고용정책/복지 정보") {
              handleSearchPolicyInfo(infoCategory);
              addMessage("bot", "고용정책/복지 정보를 불러왔습니다. 사이드 바를 열어서 확인해주세요!");
          }
        } finally {
          // setIsLoading(false);
        }
      })();
    }, [infoCategory]);

    // 자기소개서 관련 api
    const handleResumeApi = async (option, category) => {
        console.log("handleResumeApi - option:", option, "category:", category);  
        if (option === "결과 보기") {
            await handleSend("자기소개서 결과보기");
        } else if (option === "저장") {
            await handleSaveResume(category);
        }
    }

    // 새로운 대화 시작하기
    const handleSetTopic = (topic) => {
        setTopic(topic);
        setInfoCategory("");
        setSidebarOpen(false);
    }

    return (
        <Wrapper>
            {/* ⬅️ Chat (left) */}
            <ChatSection>
                {messages.length === 0 ? (
                    <Intro onOptionClick={handleOptionClick} />
                ) : (
                    <ChatArea 
                      topic={topic}
                      messages={messages} 
                      onSelect={(category) => setInfoCategory(category)}
                      handleResumeApi={(option, category)=>handleResumeApi(option, category)}
                    />
                )}
                {isLoading && <Loader message = "답변을 생성 중입니다..."/>}

                <InputWrapper>
                  <BtnWrapper>
                    <GoNewChatBtn onClick={()=>handleSetTopic(topic)}> 새로운 대화 시작하기</GoNewChatBtn>
                  </BtnWrapper>
                  <InputBar>
                      <ChatInput
                          value={inputText}
                          placeholder="메세지를 입력하세요..." 
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyDown={handleKeyDown}
                      />
                      <SendBtn onClick={handleSend}>전송</SendBtn>
                  </InputBar>
                </InputWrapper>
            </ChatSection>

            <ToggleBtn onClick={()=>setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? "→" : "←"}
            </ToggleBtn>

            {/* ➡️ Collapsible sidebar */}
            <Sidebar open={sidebarOpen}>
                <SidebarHeader>
                    <h3>{topic}</h3>
                </SidebarHeader>

                <CardList>
                    {Array.isArray(cards) && cards.length > 0 && (
                      topic === "재취업 분석" ? (
                        cards.map((card, idx) => (
                          <ReemploymentCard
                            key={card.id || idx}
                            data={card}
                          />
                        ))
                      ) : (
                        cards.map((card) => (
                          <InfoCard
                            // key={card.id}
                            topic={topic}
                            category={infoCategory}
                            data={card}
                            onClick={() => openModal(card)}
                          />
                        ))
                    ))}
                </CardList>
            </Sidebar>

            {/* ➡️ Modal */}
            {modalContent && <CardModal topic = {topic} category={infoCategory} card={modalContent} onClose={closeModal} />}
        </Wrapper>
    )
}

export default ChatbotPage;

const Wrapper = styled.div`
    position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #fafbff;
`;

const ToggleBtn = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 9999;
  background: #1a3ec6;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #1242ad;
  }
`;

const ChatSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  padding-right: 80px;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

const InputWrapper = styled.div`
    position: absolute;
    bottom: 0;
    left: -20px;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    @media (max-width: 768px) {
        padding: 10px;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        border-top: 1px solid #ececec;
        box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.05);
        z-index: 10;
    }
`;

const BtnWrapper = styled.div`
    width: 95%;
    display: flex;
    justify-content: flex-start;
    padding:0px 20px;
    @media (max-width: 768px) {
        margin-bottom: 5px;
        padding: 0 10px;
    }
`;

const GoNewChatBtn = styled.button`
    background: #1a3ec6;
    color: #fff;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;
    font-family: 'Regular', sans-serif;
    &:hover {
        background: #1242ad;
    }
    @media (max-width: 768px) {
        margin-bottom: 5px;
        padding: 8px 12px;
        font-size: 0.85rem;
    } 
`;

const InputBar = styled.div`
    width: 94%;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    padding: 10px 12px;
    gap: 8px;
    // position: absolute;
    // bottom: 20px;
    // left: 35px;  
`;

const ChatInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 10px 12px;
  background: transparent;
  color: #333;

  &::placeholder {
    color: #aaa;
  }
`;

const SendBtn = styled.button`
  background: #1a3ec6;
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: #1242ad;
  }
`;

const Sidebar = styled.aside`
  width: ${(p) => (p.open ? "320px" : "0")};
  transition: width 0.25s ease;
  background: #ffffff;
  border-left: 1px solid #ececec;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const SidebarHeader = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
`;
// const ToggleBtn = styled.button`
//   background: none;
//   border: none;
//   font-size: 1.25rem;
//   cursor: pointer;
// `;
const CardList = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 16px 0;
  border-top: 1px solid #eee;
  background: #fff;
`;

const PageBtn = styled.button`
  background: ${({ active }) => (active ? "#1a3ec6" : "#f0f0f0")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1a3ec6;
    color: #fff;
  }
`;