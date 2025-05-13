// src/api/feature/Policy/recommendPolicyByCategory.js
import pythonAPI from "../../config/pythonApi";

/**
 * 고용 정책/복지 추천 API
 *
 * @param {string} category - 교육 카테고리 (디지털기초역량/사무행정실무/전문기술자격증/서비스 직무교육)
 * @returns {Promise<AxiosResponse>} 추천된 고용 정책 정보
 */
const recommendPolicyByCategory = async (category) => {
  try {
    const res = await pythonAPI.post("/api/policy/recommend", {
      category,
    });
    console.log("정책 추천 성공:", res.data);
    return res.data;
  } catch (error) {
    console.error("정책 추천 실패:", error);
    if (error.response) {
      console.error("응답 상태 코드:", error.response.status);
      console.error("응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("요청 보냈지만 응답 없음:", error.request);
    } else {
      console.error("요청 설정 오류:", error.message);
    }
  }
};

export default recommendPolicyByCategory;
