import React, { useState, useRef, useEffect }from "react";
import styled from "styled-components";
import Intro from "../components/Chat/Intro";
import ChatArea from "../components/Chat/ChatArea";
import InfoCard from "../components/Chat/InfoCard";
import CardModal from "../components/Chat/CardModal";

const ChatbotPage =()=> {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [topic, setTopic] = useState("대화주제");
    const [inputText, setInputText] = useState("");
    const [messages, setMessages] = useState([]);
    const [cards, setCards] = useState(dummyCards);
    const [modalContent, setModalContent] = useState(null);

    // 채팅 영역 스크롤 참조
    const chatSectionRef = useRef(null);

    // 메세지가 추가될 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        if(chatSectionRef.current) {
            chatSectionRef.current.scrollTop = chatSectionRef.current.scrollHeight;
        }
    }, [messages]);

    // 대화 주제 선택
    const handleOptionClick = (option) => {
        setTopic(option);
        setMessages((prev) => [
            ...prev,
            { text: option, from: "user" },
        ]);
        // 옵션에 맞는 api 호출
    }

    // 메세지 전송(엔터터)
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    }

    // 메세지 전송
    const handleSend = () => {
        if (inputText.trim() === "") return;
        setMessages((prev) => [
            ...prev,
            { text: inputText, from: "user" },
        ]);
        setInputText("");
    }

    // 카드 클릭 시 모달 열기, 닫기
    const handleCardClick = (card) => {
        setModalContent(card);
    }

    const closeModal = () => {
        setModalContent(null);
    }

    return (
        <Wrapper>
            {/* ⬅️ Chat (left) */}
            <ChatSection>
                {messages.length === 0 ? (
                    <Intro onOptionClick={handleOptionClick} />
                ) : (
                    <ChatArea messages={messages} />
                )}
                <InputBar>
                    <ChatInput
                        value={inputText}
                        placeholder="메세지를 입력하세요..." 
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <SendBtn onClick={handleSend}>전송</SendBtn>
                </InputBar>
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
                    {cards.map((card) => (
                        <InfoCard
                            key={card.id}
                            card={card}
                            onClick={() => handleCardClick(card)}
                        />
                    ))}
                </CardList>
            </Sidebar>

            {/* ➡️ Modal */}
            {modalContent && <CardModal card={modalContent} onClose={closeModal} />}
        </Wrapper>
    )
}

export default ChatbotPage;

const dummyCards = [
  {
    id: 1,
    company: "네이버",
    position: "프론트엔드 개발자",
    summary: "React, TypeScript 경험 필수",
    detail: "상세 JD, 우대사항 등"
  },
  {
    id: 2,
    company: "카카오",
    position: "백엔드 개발자",
    summary: "Java, Spring Boot 경력자 우대",
    detail: "상세 JD, 복지, 연봉 등"
  },
  {
    id: 3,
    company: "라인",
    position: "풀스택 개발자",
    summary: "Node.js, React 개발 경험",
    detail: "협업문화, 기술스택 설명"
  }
];

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

const InputBar = styled.div`
    width: 95%;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    padding: 10px 12px;
    gap: 8px;
    position: absolute;
    bottom: 20px;  
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
