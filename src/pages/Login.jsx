import React, { useState } from "react";
import styled from "styled-components";
import logoImg from "../assets/logo.png"; // '다시일해!' 로고 이미지 경로에 맞게 설정

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrId: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container>
      <LoginBox>
        <Logo src={logoImg} alt="다시일해!" />
        <Title>로그인</Title>
        <SubText>계정에 로그인하고 서비스를 이용하세요</SubText>

        <Input
          name="emailOrId"
          type="text"
          placeholder="이메일 또는 아이디를 입력하세요"
          value={formData.emailOrId}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={formData.password}
          onChange={handleChange}
        />

        <Options>
          <label>
            <input type="checkbox" /> 로그인 상태 유지
          </label>
          <FindPassword href="#">비밀번호 찾기</FindPassword>
        </Options>

        <LoginButton>로그인</LoginButton>

        <BottomText>
          계정이 없으신가요? <SignupLink href="#">회원가입</SignupLink>
        </BottomText>
      </LoginBox>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const LoginBox = styled.div`
  width: 360px;
  padding: 40px 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Logo = styled.img`
  width: 100px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: bold;
`;

const SubText = styled.p`
  font-size: 13px;
  color: #777;
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  margin-bottom: 20px;
`;

const FindPassword = styled.a`
  color: #1976d2;
  text-decoration: none;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
`;

const BottomText = styled.p`
  margin-top: 16px;
  font-size: 13px;
`;

const SignupLink = styled.a`
  color: #1976d2;
  text-decoration: none;
  font-weight: 500;
`;

