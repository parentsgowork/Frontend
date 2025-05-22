import { create } from "zustand";
import analyzeReemployment from "../api/feature/Rag/analyzeReemployment";
import getSeniorJobs from "../api/feature/Crawler/getSeniorJobs";
import searchEducationByCategory from "../api/feature/Rag/searchEducationByCategory";
import recommendPolicyByCategory from "../api/feature/Rag/recommendPolicyByCategory";
import { initResumeSession, answerResumeQuestion, getResumeResult, saveResume } from "../api/feature/Resume/resumeApi";


const useChatStore = create((set, get) => ({
    topic: null, // 대화 주제
    messages: [], // 대화 내용

    cards: [], // 사이드바에 표시할 카드 목록
    modalContent: null, // 오픈된 모달의 컨텐츠
    isLoading: false, // 로딩 상태
    
    // 분석 및 정보 결과
    analysisResult: null, // 재취업 분석 결과
    jobInfo: [], // 채용정보
    jobPage: 1, // 채용정보 페이지 번호
    educationInfo: [], // 맞춤형 교육 정보 (사이드바)
    policyInfo: [], // 정책, 복지 정보(사이드바)

    // 자기소개서
    rsmSessionId: null,
    rsmPhase: -1,
    rsmQuestionCategory: "",
    isLast: false,
    companyName: "",
    positionName: "",
    finalRsm: null, 
    rsmInfo: null, // 자기소개서 정보(사이드바)

    // 대화 주제 설정 및 관련 상태 초기화
    setTopic: (topic) =>
        set({
            topic,
            messages:[],
            cards: [],
            modalContent: null,
            isLoading: false,

            analysisResult: null,
            jobInfo: [],
            jobPage: 1,
            educationInfo: [],
            policyInfo: [],

            rsmSessionId: null,
            rsmPhase: -1,
            rsmQuestionCategory: "",
            isLast: false,
            companyName: "",
            positionName: "",
            finalRsm: null, 
            rsmInfo: null,
    }),

    // 로딩 상태 설정
    setLoading: (isLoading) => set({ isLoading }),
    
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
            set({ isLoading: true });
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
        } finally {
            set({ isLoading: false });
        }
    },

    // 채용 정보
    handleSearchJobInfo: async () => {
        try {
            set({ isLoading: true });
            // const res = await getSeniorJobs(page);
            const res = await getSeniorJobs();
            console.log("채용정보 API 응답:", res);

            set(() => ({
                jobInfo: res,
                cards: res.data,
            }))
        } catch (error) {
            console.error("채용정보 API 호출 실패:", error);
            set((state) => ({
                messages: [
                    ...state.messages,
                    { from: "bot", text: "오류가 발생했습니다. 다시 시도해 주세요." }
                ]
            }))
        } finally {
            set({ isLoading: false });
        }
    },

    setJobPage: (page) => set({ jobPage: page }),

    // 카테고리별 교육정보 검색
    handleSearchEducationInfo: async (category) => {
        try {
            set({ isLoading: true });
            const res = await searchEducationByCategory(category);
            console.log("교육정보 API 응답:", res);

            set(() => ({
                educationInfo: res,
                cards: res.results,
            }))
        } catch (error) {
            console.error("교육정보 API 호출 실패:", error);
            set((state) => ({
                messages: [
                    ...state.messages,
                    { from: "bot", text: "오류가 발생했습니다. 다시 시도해 주세요." }
                ]
            }))
        } finally {
            set({ isLoading: false });
        }
    },

    // 카테고리별 정책정보 검색
    handleSearchPolicyInfo: async (category) => {
        try {
            set({ isLoading: true });
            const res = await recommendPolicyByCategory(category);
            console.log("정책정보 API 응답:", res);

            set(() => ({
                policyInfo: res,
                cards: res.results,
            }))
        } catch (error) {
            console.error("정책정보 API 호출 실패:", error);
            set((state) => ({
                messages: [
                    ...state.messages,
                    { from: "bot", text: "오류가 발생했습니다. 다시 시도해 주세요." }
                ]
            }))
        } finally {
            set({ isLoading: false });
        }
    },

    handleResumeSession: async (inputText) => {
        const rsmSessionId = get().rsmSessionId
        const rsmPhase = get().rsmPhase
        const isLast = get().isLast
        const companyName = get().companyName
        const positionName = get().positionName
        const addMessage = get().addMessage

        switch (rsmPhase)  {
            case -1: {// 자기소개서 버튼 클릭
                if(!companyName && !inputText) {
                    addMessage("bot", "자기소개서 작성을 시작합니다. 지원하고자 하는 회사명을 입력해주세요!");
                } else if(!companyName && inputText) {
                    addMessage("bot", `${inputText}에 지원하실 예정이군요! 이 회사에 지원하고자 하는 직무명은 무엇인가요?`);
                    set({ companyName: inputText });
                } else if(companyName && !positionName && !inputText) {
                    addMessage("bot", `${companyName}에 지원하고자 하는 직무명은 무엇인가요?`);
                } else if(companyName && !positionName && inputText) {
                    addMessage("bot", `${inputText}으로 지원하실 예정이군요! 이제 자기소개서를 차근차근 완성해볼까요? 먼저 성장과정에 대해 말씀해주세요.`);
                    set({ positionName: inputText });
                    set({ rsmPhase: 0 }); // 다음 단계 진입

                }
                break;
            }
            case 0: {// 자기소개서 세션 생성 및 첫번째 성장과정에 대한 대답 전송
                try{
                    set({ isLoading: true });

                    const resOfCreateSession = await initResumeSession(companyName, positionName);
                    const newSessionId = resOfCreateSession.session_id;
                    set({ rsmSessionId: newSessionId });
                    set({ rsmQuestionCategory: resOfCreateSession.category });
                    
                    const resOfQuestion1 = await answerResumeQuestion(newSessionId, inputText);
                    set({ rsmQuestionCategory: resOfQuestion1.current_category });
                    set({ isLast: resOfQuestion1.is_last });
                    set({ rsmPhase: 1 }); // 다음 단계 진입

                    const responseText =  `이렇게 작성해보는 건 어떨까요?\n\n${resOfQuestion1.ai_response}`;
                    const followupText =  `\n\n다음 질문도 이어서 답변해보겠습니다.  ${resOfQuestion1.next_question}` 
                    addMessage("bot", responseText+followupText);
                } catch (error) {
                    console.error("자기소개서 세션 생성 실패:", error);
                    addMessage("bot", "오류가 발생했습니다. 다시 시도해 주세요.");
                } finally {
                    set({ isLoading: false });
                }

                break;
            }
            case 1: { // 자기소개서 질문에 대한 대답 전송
                try{
                    set({ isLoading: true });

                    const resOfQuestion = await answerResumeQuestion(rsmSessionId, inputText);
                    const currentCategory = resOfQuestion.current_category;
                    const nextCategory = resOfQuestion.next_category;
                    const isLast = resOfQuestion.is_last;
                    
                    set({ rsmQuestionCategory: currentCategory, isLast });

                    const responseText =  `이렇게 작성해보는 건 어떨까요?\n\n${resOfQuestion.ai_response}`;
                    const followupText = (currentCategory == "강점약점" && nextCategory == "프로젝트경험")  
                        ? `\n\n마지막 질문입니다! ${resOfQuestion.next_question}`
                        :  (currentCategory == "프로젝트경험" && !nextCategory) 
                        ? "\n\n지금까지 작성된 자기소개서를 보시겠어요?"
                        : `\n\n다음 질문도 이어서 답변해보겠습니다.  ${resOfQuestion.next_question}`
                    const fullMessage = followupText
                        ? responseText + followupText
                        : responseText;

                    addMessage("bot", fullMessage);

                    if(isLast) { set({ rsmPhase : 2 })} // 마지막 질문 시 다음 단계 진입
                } catch (error) {
                    console.error("자기소개서 질문 응답 실패:", error);
                    addMessage("bot", "오류가 발생했습니다. 다시 시도해 주세요.");
                } finally {
                    set({ isLoading: false });
                }

                break;
            }
            case 2: { // 자기소개서 최종 결과 전송
                try{
                    set({ isLoading: true });

                    const resOfResult = await getResumeResult(rsmSessionId);
                    set({ finalRsm: resOfResult });
                    const title = resOfResult.title;
                    const sections = resOfResult.sections;
                    addMessage("bot", 
                        `최종 자기소개서를 보여드립니다!\n\n${title}` + 
                        Object.entries(sections)
                            .map(
                            ([key, value], index) =>
                                `\n${index + 1}. ${key}\n${value}`
                        )
                        .join("\n")
                    );
                    set({ rsmPhase: 3 }); // 다음 단계 진입
                } catch (error) {
                    console.error("자기소개서 최종 결과 응답 실패:", error);
                    addMessage("bot", "오류가 발생했습니다. 다시 시도해 주세요.");
                } finally {
                    set({ isLoading: false });
                }
                
                break;
            }
            // case 3: { // 자기소개서 저장
            //     addMessage("bot", "자기소개서가 저장되었습니다. 다른 질문이 있으시면 언제든지 말씀해 주세요!");
            //     break;
            // }
            default: {
                console.error("Invalid phase:", rsmPhase);
                set((state) => ({
                    messages: [
                        ...state.messages,
                        { from: "bot", text: "잘못된 요청입니다." }
                    ]
                }));
                break;  
            }
        }
    },

    handleSaveResume: async (category) => {
        const rsmPhase = get().rsmPhase
        const finalRsm = get().finalRsm


        if(rsmPhase === 3) {
            console.log("자기소개서 카테고리:", category);
            try {
                set({ isLoading: true });
                const res = await saveResume({
                    ...finalRsm,
                    resume_category: category,
                });
                get().addMessage("bot", "자기소개서가 저장되었습니다. 다른 질문이 있으시면 언제든지 말씀해 주세요!");
                console.log("자기소개서 저장 성공:", res);
            } catch (error) {
                console.error("자기소개서 저장 실패:", error);
            } finally {
                set({ isLoading: false });
            }
        }
    },
}));

export default useChatStore;