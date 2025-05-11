// src/api/feature/Resume/resumeSessionAPI.js
import pythonAPI from "../../config/pythonApi";

/**
 * 자기소개서 세션 시작 (회사명 + 직무 입력)
 * @param {string} company - 회사명
 * @param {string} position - 직무명
 * @returns {Promise<AxiosResponse>}
 */
export const initResumeSession = async (company, position) => {
  try {
    const res = await pythonAPI.post("/api/resume/init", {
      company,
      position,
    });
    console.log("세션 시작 성공:", res);
    return res;
  } catch (error) {
    console.error("세션 시작 실패:", error);
    throw error;
  }
};

/**
 * 질문에 대한 사용자 입력을 기반으로 AI 응답 생성
 * @param {string} sessionId - 현재 세션 ID
 * @param {string} userInput - 사용자의 입력
 * @returns {Promise<AxiosResponse>}
 */
export const answerResumeQuestion = async (sessionId, userInput) => {
  try {
    const res = await pythonAPI.post("/api/resume/answer", {
      session_id: sessionId,
      user_input: userInput,
    });
    console.log("AI 응답 생성 성공:", res);
    return res;
  } catch (error) {
    console.error("AI 응답 생성 실패:", error);
    throw error;
  }
};
