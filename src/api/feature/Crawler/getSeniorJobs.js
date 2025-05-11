// src/api/Crawler/getSeniorJobs.js
import springAPI from "../../config/springApi";

/**
 * 시니어(50세 이상) 채용정보 조회 API
 * 
 * @param {number} page - 조회할 페이지 번호 (기본값: 1)
 * @returns {Promise<AxiosResponse>} 시니어 채용정보 리스트
 */
const getSeniorJobs = async (page = 1) => {
  try {
    const res = await springAPI.get(`/crawler/senior-jobs?page=${page}`);
    console.log("시니어 채용정보 응답:", res);
    return res;
  } catch (error) {
    console.error("시니어 채용정보 조회 실패:", error);
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
