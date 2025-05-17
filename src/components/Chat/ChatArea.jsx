import React from "react";
import styled from "styled-components";

const educationOptions = [
  "디지털기초역량",
  "사무행정실무",
  "전문기술자격증",
  "서비스 직무교육",
];

const policyOptions = [
  "취업 지원금",
  "직업 훈련 지원",
  "고용 안정 지원",
  "생활 안정 지원",
];

const ChatArea = ({ topic, messages, onSelect, onSave }) => {
    let options = [];
    if (topic === "교육 정보") {
        options = educationOptions;
    } else if (topic === "고용정책/복지 정보") {
        options = policyOptions;
    }

    return(
        <ChatBox>
            {messages.map((m, idx) => (
                <Bubble key={idx} from={m.from}>
                  {m.text}

                  {/* 교육 정보, 고용정책/복지 정보 option 클릭 시 */}
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

                  {/* 자기소개서 저장 버튼  */}
                  {idx === messages.length - 1 &&
                    m.from === "bot" &&
                    m.text.includes("지금까지 작성된 자기소개서를") && (
                      <ButtonGroup>
                        <OptionBtn onClick={() => onSave()}>
                          자기소개서 저장하기
                        </OptionBtn>
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