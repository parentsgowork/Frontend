import React from "react";
import styled from "styled-components";

const InfoCard = ({ card, onClick }) => {
    return(
        <CardContainer onClick={() => onClick(card)}>
            <h4>{card.company}</h4>
            <p>{card.position}</p>
            <small>{card.summary}</small>
        </CardContainer>
    )
}

export default InfoCard;

const CardContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  background: #fafafa;
  &:hover {
    background: #f0f4ff;
  }
  h4 {
    margin: 0 0 6px 0;
  }
  p {
    margin: 0 0 4px 0;
    font-size: 0.9rem;
  }
  small {
    color: #666;
  }
`;