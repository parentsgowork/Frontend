// src/api/feature/Resume/resumeStorageAPI.js
import pythonAPI from "../../config/pythonApi";

/**
 * 자기소개서 세션 시작 (회사명 + 직무 입력)
 * @param {string} company - 회사명
 * @param {string} position - 직무명
 * @returns {Promise<AxiosResponse>}
 */
const initResumeSession = async (company, position) => {
  try {
    const res = await pythonAPI.post("/api/resume/init", {
      company,
      position,
    });
    console.log("세션 시작 성공:", res);
    return res.data;
  } catch (error) {
    console.error("세션 시작 실패:", error);
    if (error.response) {
      console.error("응답 상태 코드:", error.response.status);
      console.error("응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("요청 보냈지만 응답 없음:", error.request);
    } else {
      console.error("요청 설정 중 오류:", error.message);
    }
  }
};

/**
 * 질문에 대한 사용자 입력을 기반으로 AI 응답 생성
 * @param {string} sessionId - 현재 세션 ID
 * @param {string} userInput - 사용자의 입력
 * @returns {Promise<AxiosResponse>}
 */
const answerResumeQuestion = async (sessionId, userInput) => {
  console.log("세션 ID:", sessionId);
  console.log("사용자 입력:", userInput);
  try {
    const res = await pythonAPI.post("/api/resume/answer", {
      session_id: sessionId,
      user_input: userInput,
    });
    console.log("AI 응답 생성 성공:", res);
    return res.data;
  } catch (error) {
    console.error("AI 응답 생성 실패:", error);
    if (error.response) {
      console.error("응답 상태 코드:", error.response.status);
      console.error("응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("요청 보냈지만 응답 없음:", error.request);
    } else {
      console.error("요청 설정 중 오류:", error.message);
    }
  }
};

/**
 * 세션 ID에 해당하는 최종 자기소개서 결과 조회
 * @param {string} sessionId
 * @returns {Promise<AxiosResponse>}
 */
const getResumeResult = async (sessionId) => {
  try {
    const res = await pythonAPI.get(`/api/resume/result/${sessionId}`);
    console.log("자기소개서 결과 조회 성공:", res);
    return res.data;
  } catch (error) {
    console.error("자기소개서 결과 조회 실패:", error);
    if (error.response) {
      console.error("응답 상태 코드:", error.response.status);
      console.error("응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("요청 보냈지만 응답 없음:", error.request);
    } else {
      console.error("요청 설정 중 오류:", error.message);
    }
  }
};

/**
 * 최종 자기소개서를 DB에 저장
 * @param {object} data - 저장할 데이터 (user_id, title, sections, resume_category)
 * @returns {Promise<AxiosResponse>}
 */
const saveResume = async (data) => {
  try {
    const res = await pythonAPI.post("/api/resume/save", data);
    console.log("자기소개서 저장 성공:", res);
    return res;
  } catch (error) {
    console.error("자기소개서 저장 실패:", error);
    if (error.response) {
      console.error("응답 상태 코드:", error.response.status);
      console.error("응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("요청 보냈지만 응답 없음:", error.request);
    } else {
      console.error("요청 설정 중 오류:", error.message);
    }
  }
};

/**
 * 특정 유저의 자기소개서 목록 조회
 * @param {number} userId
 * @returns {Promise<AxiosResponse>}
 */
const getUserResumes = async () => {
  try {
    const res = await pythonAPI.get(`/api/resume/user`);
    console.log("유저 자기소개서 목록 조회 성공:", res);
    return res.data;
  } catch (error) {
    console.error("유저 자기소개서 목록 조회 실패:", error);
    if (error.response) {
      console.error("응답 상태 코드:", error.response.status);
      console.error("응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("요청 보냈지만 응답 없음:", error.request);
    } else {
      console.error("요청 설정 중 오류:", error.message);
    }
  }
};

export { 
  initResumeSession, 
  answerResumeQuestion, 
  getResumeResult, 
  saveResume, 
  getUserResumes 
};
