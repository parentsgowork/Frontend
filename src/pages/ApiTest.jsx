import React from "react";
import styled from "styled-components";
import sendEmailVerification from "../api/feature/Auth/sendEmailVerification";
import confirmEmailVerification from "../api/feature/Auth/confirmEmailVerification";
import signupWithEmail from "../api/feature/Auth/signupWithEmail";
import loginWithEmail from "../api/feature/Auth/loginWithEmail";
import reissueToken from "../api/feature/Auth/reissueToken";
import getSeniorJobs from "../api/feature/Crawler/getSeniorJobs";

const ApiTest = () => {

    // 이메일 인증코드 전송
    const handleSendEmail = async () => {
        const email = "muwingky@naver.com";
        const type = "SIGNUP"; // 'SIGNUP' 또는 'PASSWORD_RESET'
        try {
            const response = await sendEmailVerification(email, type);
            console.log("인증 메일 전송 성공:", response);
        } catch (error) {
            console.error("인증 메일 전송 실패:", error);
        }
    }

    // 인증코드 확인
    const handleConfirmEmail = async () => {
        const email = "muwingky@naver.com";
        const authCode = "GbZZucFw";
        try {
            const response = await confirmEmailVerification(email, authCode);
            console.log("인증 코드 확인 성공:", response);
        } catch (error) {
            console.error("인증 코드 확인 실패:", error);
        }
    }

    // 회원가입
    const handleSignup = async () => {
        const signupData = {
            isVerified: true,
            email: "muwingky@naver.com",
            name: "황무원",
            password: "12345678",
            age: 23,
            gender: "FEMALE",
            region: "SEOUL",
            job: "개발자",
            career: 2,
            finalEdu: "BACHELOR"
        };
        try {
            const response = await signupWithEmail(signupData);
            console.log("회원가입 성공:", response);
        } catch (error) {
            console.error("회원가입 실패:", error);
        }
    }

    // 로그인
    const handleLogin = async () => {
        const loginData = {
            email: "muwingky@naver.com",
            password: "12345678"
        };
        try {
            const response = await loginWithEmail(loginData);
            console.log("로그인 성공:", response);
        } catch (error) {
            console.error("로그인 실패:", error);
        }
    }

    // 토큰 재발급
    const handleReissueToken = async () => {
        const refreshToken = "your_refresh_token_here"; 
        try {
            const response = await reissueToken(refreshToken);
            console.log("토큰 재발급 성공:", response);
        } catch (error) {
            console.error("토큰 재발급 실패:", error);
        }
    }

    // 크롤링
    const handleGetSeniorJobs = async () => {
        try {
            const response = await getSeniorJobs();
            console.log("크롤링 성공:", response);
        } catch (error) {
            console.error("크롤링 실패:", error);
        }
    }

    return (
        <>
            <h1>API 테스트 페이지</h1>
            <Section>
                <SectionTitle>AUTH</SectionTitle>
                <ButtonContainer>
                    <Button onClick={handleSendEmail} success={true}>인증 메일 전송</Button>
                    <Button onClick={handleConfirmEmail} success={true}>인증 코드 확인</Button>
                    <Button onClick={handleSignup} success={false}>회원가입</Button>
                    <Button onClick={handleLogin} success={false}>로그인</Button>
                    <Button onClick={handleReissueToken} success={false}>토큰 재발급</Button>
                </ButtonContainer>
                <SectionTitle>CRAWLER</SectionTitle>
                <ButtonContainer>
                    <Button onClick={handleGetSeniorJobs} success={false}>크롤링</Button>
                </ButtonContainer>
            </Section>
        </>
    )
}
export default ApiTest;

const Section = styled.div`
    margin-bottom: 2rem;
    text-align: center;
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 1rem;
`;

const Button = styled.button`
    background-color: ${({ success }) => (success ? "#28a745" : "#707070")};
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({ success }) => (success ? "#218838" : "#505050")};
    }

    &:disabled {
        background-color: #d6d6d6;
        cursor: not-allowed;
    }
`