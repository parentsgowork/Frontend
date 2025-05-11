import React from "react";
import styled from "styled-components";

const ChatArea = ({ messages }) => {
    return(
        <ChatBox>
            {messages.map((m, idx) => (
                <Bubble key={idx} from={m.from}>
                {m.text}
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