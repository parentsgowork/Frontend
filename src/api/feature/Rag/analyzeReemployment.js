// src/api/Reemployment/analyzeReemployment.js
import pythonAPI from "../../config/pythonApi";

/**
 * GPT 기반 재취업 가능성 분석 API
 * 
 * @param {string} question - 예: "50대, 광업, 남성 재취업 가능성이 궁금해"
 * @returns {Promise<AxiosResponse>} 분석 응답
 */
const analyzeReemployment = async (question) => {
  try {
    const res = await pythonAPI.post("/api/reemployment/analyze", {
      question,
    });
    console.log("재취업 분석 응답:", res);
    return res;
  } catch (error) {
    console.error("재취업 분석 요청 실패:", error);
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

export default analyzeReemployment;
