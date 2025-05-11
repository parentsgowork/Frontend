// src/api/feature/Resume/resumeStorageAPI.js
import pythonAPI from "../../config/pythonApi";

/**
 * 세션 ID에 해당하는 최종 자기소개서 결과 조회
 * @param {string} sessionId
 * @returns {Promise<AxiosResponse>}
 */
export const getResumeResult = async (sessionId) => {
  try {
    const res = await pythonAPI.get(`/api/resume/result/${sessionId}`);
    console.log("자기소개서 결과 조회 성공:", res);
    return res;
  } catch (error) {
    console.error("자기소개서 결과 조회 실패:", error);
    throw error;
  }
};

/**
 * 최종 자기소개서를 DB에 저장
 * @param {object} data - 저장할 데이터 (user_id, title, sections, resume_category)
 * @returns {Promise<AxiosResponse>}
 */
export const saveResume = async (data) => {
  try {
    const res = await pythonAPI.post("/api/resume/save", data);
    console.log("자기소개서 저장 성공:", res);
    return res;
  } catch (error) {
    console.error("자기소개서 저장 실패:", error);
    throw error;
  }
};

/**
 * 특정 유저의 자기소개서 목록 조회
 * @param {number} userId
 * @returns {Promise<AxiosResponse>}
 */
export const getUserResumes = async (userId) => {
  try {
    const res = await pythonAPI.get(`/api/resume/user/${userId}`);
    console.log("유저 자기소개서 목록 조회 성공:", res);
    return res;
  } catch (error) {
    console.error("유저 자기소개서 목록 조회 실패:", error);
    throw error;
  }
};
