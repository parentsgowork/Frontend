import React from "react";
import styled from "styled-components";
import useAuthStore from "../stores/useAuthStore";

import sendEmailVerification from "../api/feature/Auth/sendEmailVerification";
import confirmEmailVerification from "../api/feature/Auth/confirmEmailVerification";
import signupWithEmail from "../api/feature/Auth/signupWithEmail";
import loginWithEmail from "../api/feature/Auth/loginWithEmail";
import reissueToken from "../api/feature/Auth/reissueToken";
import { deactivateUser, changePassword } from "../api/feature/Auth/userSetting";
import getSeniorJobs from "../api/feature/Crawler/getSeniorJobs";
import analyzeReemployment from "../api/feature/Rag/analyzeReemployment";
import searchEducationByCategory from "../api/feature/Rag/searchEducationByCategory";
import recommendPolicyByCategory from "../api/feature/Rag/recommendPolicyByCategory";
// import bookmarkEducation from "../api/feature/Bookmark/bookmarkEducation";
// import bookmarkPolicy from "../api/feature/Bookmark/bookmarkPolicy";
// import bookmarkJob from "../api/feature/Bookmark/bookmarkJob";
// import { fetchAllBookmarks, fetchBookmarkById, deleteBookmarkById } from "../api/feature/Bookmark/bookmarkApi";
// import { initResumeSession, answerResumeQuestion } from "../api/feature/Resume/resumeAICall";
// import { getResumeResult, saveResume, getUserResumes } from "../api/feature/Resume/resumeApi";

const ApiTest = () => {

    const { login } = useAuthStore();

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
        const authCode = "U1ZjstDR";
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
            password: "12341234"
        };
        try {
            const response = await loginWithEmail(loginData);
            const { accessToken, refreshToken } = response;
            login(accessToken, refreshToken);
        } catch (error) {
            console.error("로그인 실패:", error);
        }
    }

    // 토큰 재발급
    const handleReissueToken = async () => {
        const refreshToken = "eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3NTIzMTAzMjd9.EkDp0WJHS8Wm_3pW1y07UpU3I_0fLq5MUdDp17t31MY"; 
        try {
            const response = await reissueToken(refreshToken);
            console.log("토큰 재발급 성공:", response);
        } catch (error) {
            console.error("토큰 재발급 실패:", error);
        }
    }

    // 회원 탈퇴
    const handleDeactivateUser = async () => {
        try {
            const response = await deactivateUser();
            console.log("회원 탈퇴 성공:", response);
        } catch (error) {
            console.error("회원 탈퇴 실패:", error);
        }
    }

    // 비밀번호 변경
    const handleChangePassword = async () => {
        const passwordData = {
            isVerified: true,
            email: "muwingky@naver.com",
            password: "12345678",
            passwordCheck: "12345678"
        };
        try {
            const response = await changePassword(passwordData);
            console.log("비밀번호 변경 성공:", response);
        } catch (error) {
            console.error("비밀번호 변경 실패:", error);
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

    // 재취업 분석
    const handleAnalyzeReemployment = async () => {
        const data = "50대, 광업, 남성 재취업 가능성이 궁금해";
        try {
            const response = await analyzeReemployment(data);
            console.log("재취업 분석 성공:", response);
        } catch (error) {
            console.error("재취업 분석 실패:", error);
        }
    }

    // 교육 검색
    const handleSearchEducationByCategory = async () => {
        const category = "사무행정실무";
        try {
            const response = await searchEducationByCategory(category);
            console.log("교육 검색 성공:", response);
        } catch (error) {
            console.error("교육 검색 실패:", error);
        }
    }

    // 정책 추천
    const handleRecommendPolicyByCategory = async () => {
        const category = "디지털기초역량";
        try {
            const response = await recommendPolicyByCategory(category);
            console.log("정책 추천 성공:", response);
        } catch (error) {
            console.error("정책 추천 실패:", error);
        }
    }

    // 교육 북마크
    const handleBookmarkEducation = async () => {
        const userId = 1; // 북마크할 교육 ID
        const bookmark = [
            {
            "title": "교육1",
            "url": "https://example.com/edu1"
            },
            {
            "title": "교육2",
            "url": "https://example.com/edu2"
            }
        ]
        try {
            const response = await bookmarkEducation(userId, bookmark);
            console.log("교육 북마크 성공:", response);
        } catch (error) {
            console.error("교육 북마크 실패:", error);
        }
    }

    // 고용정책/복지 북마크
    const handleBookmarkPolicy = async () => {
        const userId = 1; // 북마크할 정책 ID
        const policies = [
            {
                "title": "정책1",
                "category": "고용지원",
                "description": "정책1 설명",
                "url": "https://example.com/policy1"
            },
            {
                "title": "정책2",
                "category": "복지지원",
                "description": "정책2 설명",
                "url": "https://example.com/policy2"
            }
        ]
        try {
            const response = await bookmarkPolicy(userId, policies);
            console.log("정책 북마크 성공:", response);
        } catch (error) {
            console.error("정책 북마크 실패:", error);
        }
    }

    // 채용정보 북마크
    const handleBookmarkJob = async () => {
        const jobId = 1; // 북마크할 채용 정보 ID
        const page = 1; // 페이지 번호
        try {
            const response = await bookmarkJob(jobId, page);
            console.log("채용 정보 북마크 성공:", response);
        } catch (error) {
            console.error("채용 정보 북마크 실패:", error);
        }
    }

    // 전체 북마크 조회
    const handleFetchAllBookmarks = async () => {
        try {
            const response = await fetchAllBookmarks();
            console.log("전체 북마크 조회 성공:", response);
        } catch (error) {
            console.error("전체 북마크 조회 실패:", error);
        }
    }

    // 특정 북마크 조회
    const handleFetchBookmarkById = async () => {
        const bookmarkId = 1; // 조회할 북마크 ID
        try {
            const response = await fetchBookmarkById(bookmarkId);
            console.log("북마크 상세 조회 성공:", response);
        } catch (error) {
            console.error("북마크 상세 조회 실패:", error);
        }
    }

    // 특정 북마크 삭제
    const handleDeleteBookmarkById = async () => {
        const bookmarkId = 1; // 삭제할 북마크 ID
        try {
            const response = await deleteBookmarkById(bookmarkId);
            console.log("북마크 삭제 성공:", response);
        } catch (error) {
            console.error("북마크 삭제 실패:", error);
        }
    }

    // 이력서 세션 초기화
    const handleInitResumeSession = async () => {
        const userId = 1; // 사용자 ID
        try {
            const response = await initResumeSession(userId);
            console.log("이력서 세션 초기화 성공:", response);
        } catch (error) {
            console.error("이력서 세션 초기화 실패:", error);
        }
    }

    // 이력서 질문에 답변하기
    const handleAnswerResumeQuestion = async () => {
        const sessionId = 1; // 세션 ID
        const questionId = 1; // 질문 ID
        const answer = "답변 내용"; // 답변 내용
        try {
            const response = await answerResumeQuestion(sessionId, questionId, answer);
            console.log("이력서 질문 답변 성공:", response);
        } catch (error) {
            console.error("이력서 질문 답변 실패:", error);
        }
    }

    // 이력서 결과 조회
    const handleGetResumeResult = async () => {
        const resumeId = 1; // 이력서 ID
        try {
            const response = await getResumeResult(resumeId);
            console.log("이력서 결과 조회 성공:", response);
        } catch (error) {
            console.error("이력서 결과 조회 실패:", error);
        }
    }

    // 이력서 저장
    const handleSaveResume = async () => {
        const resumeData = {
            userId: 1,
            title: "이력서 제목",
            sections: [
                { sectionId: 1, content: "내용1" },
                { sectionId: 2, content: "내용2" }
            ],
            resumeCategory: "카테고리"
        };
        try {
            const response = await saveResume(resumeData);
            console.log("이력서 저장 성공:", response);
        } catch (error) {
            console.error("이력서 저장 실패:", error);
        }
    }

    // 유저 이력서 목록 조회
    const handleGetUserResumes = async () => {
        const userId = 1; // 사용자 ID
        try {
            const response = await getUserResumes(userId);
            console.log("유저 이력서 목록 조회 성공:", response);
        } catch (error) {
            console.error("유저 이력서 목록 조회 실패:", error);
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
                    <Button onClick={handleSignup} success={true}>회원가입</Button>
                    <Button onClick={handleLogin} success={true}>로그인</Button>
                    <Button onClick={handleReissueToken} success={true}>토큰 재발급</Button>
                    <Button onClick={handleDeactivateUser} success={false}>회원 탈퇴</Button>
                    <Button onClick={handleChangePassword} success={false}>비밀번호 변경</Button>
                </ButtonContainer>

                <SectionTitle>CRAWLER</SectionTitle>
                <ButtonContainer>
                    <Button onClick={handleGetSeniorJobs} success={false}>채용정보</Button>
                </ButtonContainer>

                <SectionTitle>RAG</SectionTitle>
                <ButtonContainer>
                    <Button onClick={handleAnalyzeReemployment} success={false}>재취업 분석</Button>
                    <Button onClick={handleSearchEducationByCategory} success={false}>교육 검색</Button>
                    <Button onClick={handleRecommendPolicyByCategory} success={false}>고용정책/복지 안내</Button>
                </ButtonContainer>

                {/* <SectionTitle>BOOKMARK</SectionTitle>
                <ButtonContainer>
                    <Button onClick={handleBookmarkEducation} success={false}>교육 북마크(py)</Button>
                    <Button onClick={handleBookmarkPolicy} success={false}>정책 북마크(py)</Button>
                    <Button onClick={handleBookmarkJob} success={false}>채용정보 북마크(sp)</Button>
                    <Button onClick={handleFetchAllBookmarks} success={false}>전체 북마크 조회(sp)</Button>
                    <Button onClick={handleFetchBookmarkById} success={false}>북마크 상세 조회(sp)</Button>
                    <Button onClick={handleDeleteBookmarkById} success={false}>북마크 삭제(sp)</Button>
                </ButtonContainer> */}

                <SectionTitle>RESUME</SectionTitle>
                <ButtonContainer>
                    <Button onClick={handleInitResumeSession} success={false}>이력서 세션 초기화</Button>
                    <Button onClick={handleAnswerResumeQuestion} success={false}>이력서 질문 답변</Button>
                    <Button onClick={handleGetResumeResult} success={false}>이력서 결과 조회</Button>
                    <Button onClick={handleSaveResume} success={false}>이력서 저장</Button>
                    <Button onClick={handleGetUserResumes} success={false}>유저 이력서 목록 조회</Button>
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