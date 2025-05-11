// src/pages/Login.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import loginWithEmail from '../api/feature/Auth/loginWithEmail';
import useAuthStore from '../stores/useAuthStore';
import { FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await loginWithEmail(form);
      const { accessToken, refreshToken } = res.data.result;
      login(accessToken, refreshToken);
      navigate('/'); // 홈 또는 대시보드로 이동
    } catch  {
      setErrorMsg('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <Wrapper>
      <FormContainer onSubmit={handleSubmit}>
        <Logo>다시일해!</Logo>
        <Title>로그인</Title>
        <SubText>계정에 로그인하고 서비스를 이용하세요!</SubText>

        <InputGroup>
          <FaUser />
          <Input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일 또는 아이디를 입력하세요"
            required
          />
        </InputGroup>

        <InputGroup>
          <FaLock />
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </InputGroup>

        <Options>
          <div>
            {/* <input type="checkbox" id="keepLogin" />
            <label htmlFor="keepLogin"> 로그인 상태 유지</label> */}
          </div>
          <FindLink href="#">비밀번호 찾기</FindLink>
        </Options>

        {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}

        <LoginButton type="submit">로그인</LoginButton>

        <BottomText>
          계정이 없으신가요? <JoinLink to="/signup">회원가입</JoinLink>
        </BottomText>
      </FormContainer>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #fff;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 360px;
  padding: 2rem;
  border-radius: 8px;
`;

const Logo = styled.h1`
  text-align: center;
  font-size: 1.6rem;
  color: #1a73e8;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  font-weight: bold;
  text-align: center;
`;

const SubText = styled.p`
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 1.5rem;
  color: #555;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  svg {
    margin-right: 0.5rem;
    color: #888;
  }
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.95rem;
`;

const Options = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  margin-bottom: 1rem;
`;

const FindLink = styled.a`
  color: #1a73e8;
  text-decoration: none;
`;

const ErrorMsg = styled.div`
  color: red;
  font-size: 0.85rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const LoginButton = styled.button`
  background-color: #1a73e8;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0b59c4;
  }
`;

const BottomText = styled.div`
  margin-top: 1.2rem;
  font-size: 0.9rem;
  text-align: center;
`;

const JoinLink = styled(Link)`
  color: #1a73e8;
  text-decoration: none;
  margin-left: 0.2rem;
`;

