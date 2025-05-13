import { create } from "zustand";
import analyzeReemployment from "../api/feature/Rag/analyzeReemployment";
import getSeniorJobs from "../api/feature/Crawler/getSeniorJobs";
import searchEducationByCategory from "../api/feature/Rag/searchEducationByCategory";
import recommendPolicyByCategory from "../api/feature/Rag/recommendPolicyByCategory";
import { initResumeSession, answerResumeQuestion } from "../api/feature/Resume/resumeSession";
import { getResumeResult, saveResume } from "../api/feature/Resume/resumeStorageAPI";


const useChatStore = create((set) => ({
    topic: null, // 대화 주제
    messages: [], // 대화 내용

    cards: [], // 사이드바에 표시할 카드 목록
    modalContent: null, // 오픈된 모달의 컨텐츠

    // 분석 및 정보 결과
    analysisResult: null, // 재취업 분석 결과
    jobInfo: [], // 채용정보
    jobPage: 1, // 채용정보 페이지 번호
    educationInfo: [], // 맞춤형 교육 정보 
    policyInfo: [], // 정책, 복지 정보

    // 자기소개서
    resumeSessionId: null, 
    resumeResult: null, 

    // 대화 주제 설정 및 관련 상태 초기화
    setTopic: (topic) =>
        set({
            topic,
            messages:[],
            cards: [],
            modalContent: null,

            analysisResult: null,
            jobInfo: [],
            jobPage: 1,
            educationInfo: [],
            policyInfo: [],

            resumeSessionId: null,
            resumeResult: null,
        }),
    
    // 메세지 추가
    addMessage: (from, text) => 
        set((state) => ({messages: [...state.messages, { from, text }]})),
    
    // 메세지 초기화
    clearMessages: () => set({ messages: [] }),
    
    // 모달 열기/닫기
    openModal: (card) => set({modalContent: card}),
    closeModal: () => set({modalContent: null}),

    // 재취업 분석 
    handleReemploymentAnalysis: async (question) => {
        try{
            const res = await analyzeReemployment(question);
            const {answer, ...analyzedData} = res.data;

            set((state) => ({
                messages: [
                    ...state.messages,
                    { from: "bot", text: answer }
                ],
                analysisResult: analyzedData,
                cards: [ ...state.cards, analyzedData]
            }))
        } catch (error) {
            console.error("재취업 분석 API 호출 실패:", error);
            set((state) => ({
                messages: [
                    ...state.messages,
                    { from: "bot", text: "오류가 발생했습니다. 다시 시도해 주세요." }
                ]
            }))
        }
    },

    handleSearchJobInfo: async (page) => {
        try {
            const res = await getSeniorJobs(page);

            set(() => ({
                jobInfo: res,
                cards: res,
            }))
        } catch (error) {
            console.error("채용정보 API 호출 실패:", error);
            set((state) => ({
                messages: [
                    ...state.messages,
                    { from: "bot", text: "오류가 발생했습니다. 다시 시도해 주세요." }
                ]
            }))
        }
    },

    handleSearchEducationInfo: async (category) => {
        try {
            const res = await searchEducationByCategory(category);

            set(() => ({
                educationInfo: res,
                cards: res,
            }))
        } catch (error) {
            console.error("교육정보 API 호출 실패:", error);
            set((state) => ({
                messages: [
                    ...state.messages,
                    { from: "bot", text: "오류가 발생했습니다. 다시 시도해 주세요." }
                ]
            }))
        }
    },

    handleSearchPolicyInfo: async (category) => {
        try {
            const res = await recommendPolicyByCategory(category);

            set(() => ({
                policyInfo: res,
                cards: res,
            }))
        } catch (error) {
            console.error("정책정보 API 호출 실패:", error);
            set((state) => ({
                messages: [
                    ...state.messages,
                    { from: "bot", text: "오류가 발생했습니다. 다시 시도해 주세요." }
                ]
            }))
        }
    },

    
    // 맞춤형 교육 정보 
    setEducationInfo: (info) => set({ educationInfo: info }),

    // 정책, 복지 정보 
    setPolicyInfo: (info) => set({ policyInfo: info }),

    // 자기소개서 
    setResumeSessionId: (sessionId) => set({ resumeSessionId: sessionId }),
    setResumeResult: (result) => set({ resumeResult: result }),
}));

export default useChatStore;