import React from "react";
import styled from "styled-components";
import exampleImage from '../../assets/images/metamong.png';

const options = [
  { label: "재취업 가능성을 알고 싶어요.", value: "재취업 분석" }, // 실제 응답: "재취업 분석"
  { label: "채용 정보가 궁금해요.", value: "채용 정보" },           // 실제 응답: "채용 정보"
  { label: "교육 정보가 궁금해요.", value: "교육 정보" },           // 실제 응답: "교육 정보"
  { label: "고용정책/복지 정보가 궁금해요.", value: "고용정책/복지 정보" }, // 실제 응답: "고용정책/복지 정보"
  { label: "자기소개서를 작성하고 싶어요.", value: "자기소개서" }, // 실제 응답: "자기소개서"
];

const Intro = ({ onOptionClick }) => {

    return(
        <IntroBox>
            <RobotImg src={exampleImage} alt="robot" />
            <br></br>
            <Greeting>안녕하세요! 어떤 도움이 필요하신가요?</Greeting>
            <Options>
                {options.map((opt) => (
                <OptionBtn key={opt.value} onClick={() => onOptionClick(opt.value)}>
                    {opt.label}
                </OptionBtn>
                ))}
            </Options>
        </IntroBox>
    )
}

export default Intro;

const IntroBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const RobotImg = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
`;
const Greeting = styled.div`
  background-color: #1a3ec6; // 또는 #1877f2
  color: white;
  font-size: 1rem;
  font-weight: 500;
  font-family: 'Regular';
  padding: 16px 32px;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  display: inline-block;
  text-align: center;
  margin-bottom: 16px;
`;
const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const OptionBtn = styled.button`
  width: 280px;
  padding: 12px 16px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-align: left;
  cursor: pointer;
  font-size: 15px;
  font-family: 'Regular';
  &:hover {
    background: #f5f7ff;
  }
`;