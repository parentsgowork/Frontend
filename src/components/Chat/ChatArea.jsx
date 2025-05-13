import React from "react";
import styled from "styled-components";

const options = [
  "디지털 역량 교육",
  "직업 훈련",
  "자격증 과정",
  "기타 교육"
];

const ChatArea = ({ messages, onSelect }) => {

    return(
        <ChatBox>
            {messages.map((m, idx) => (
                <Bubble key={idx} from={m.from}>
                  {m.text}

                  {idx === messages.length - 1 &&
                    m.from === "bot" &&
                    (m.text === "궁금한 교육 정보를 선택해주세요!" || m.text === "궁금한 고용 정책/복지 정보를 선택해주세요!")&& (
                      <ButtonGroup>
                        {options.map((opt) => (
                          <OptionBtn
                            key={opt}
                            onClick={() => onSelect(opt)}
                          >
                            {opt}
                          </OptionBtn>
                        ))}
                      </ButtonGroup>
                  )}
                </Bubble>
            ))}
        </ChatBox>
    )
}

export default ChatArea;

const ChatBox = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Bubble = styled.div`
  max-width: 70%;
  align-self: ${(p) => (p.from === "user" ? "flex-end" : "flex-start")};
  background: ${(p) => (p.from === "user" ? "#1164D3" : "#e5e8ff")};
  color: ${(p) => (p.from === "user" ? "#fff" : "#000")};
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OptionBtn = styled.button`
  background: #fff;
  color: #1a3ec6;
  border: 1px solid #1a3ec6;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s;

  &:hover {
    background: #e5e8ff;
  }
`;