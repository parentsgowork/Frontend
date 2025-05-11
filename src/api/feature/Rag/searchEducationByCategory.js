// src/api/feature/Education/searchEducationByCategory.js
import pythonAPI from "../../config/pythonApi";

/**
 * 중장년층 맞춤형 교육정보 조회 API
 * 
 * @param {string} category - 교육 카테고리 (디지털기초역량/사무행정실무/전문기술자격증/서비스 직무교육)
 * @returns {Promise<AxiosResponse>} 교육 프로그램 리스트
 */
const searchEducationByCategory = async (category) => {
  try {
    const res = await pythonAPI.post("/api/education/search", {
      category,
    });
    console.log("교육 정보 조회 성공:", res);
    return res;
  } catch (error) {
    console.error("교육 정보 조회 실패:", error);
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

export default searchEducationByCategory;
