// src/api/Crawler/getSeniorJobs.js
import pythonApi from "../../config/pythonApi";

/**
 * 사용자 맞춤 구직 추천 API
 *
 * @returns {Promise<AxiosResponse>} 사용자 조건 기반의 구직 정보 리스트
 */
const getSeniorJobs = async () => {
  try {
    const res = await pythonApi.get("/api/job/recommend");
    console.log("사용자 맞춤 구직 추천 응답:", res);
    return res;
  } catch (error) {
    console.error("사용자 맞춤 구직 추천 조회 실패:", error);
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

export default getSeniorJobs;
