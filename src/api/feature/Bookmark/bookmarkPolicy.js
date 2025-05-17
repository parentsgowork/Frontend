// src/api/feature/Bookmark/bookmarkPolicy.js
import pythonAPI from "../../config/pythonApi";

/**
 * 정책 정보 북마크 저장 API
 *
 * @param {number} userId - 사용자 ID
 * @param {Array<{title: string, category: string, description: string, url: string}>} policies - 북마크할 정책 목록
 * @returns {Promise<AxiosResponse>} 서버 응답
 */
const bookmarkPolicy = async (policies) => {
  console.log("정책정보 북마크 저장 요청:", policies);
  try {
    const res = await pythonAPI.post("/api/policy/bookmark", {
      policies,
    });
    console.log("정책 북마크 저장 성공:", res);
    return res;
  } catch (error) {
    console.error("정책 북마크 저장 실패:", error);
    if (error.response) {
      console.error("응답 상태 코드:", error.response.status);
      console.error("응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("응답 없음:", error.request);
    } else {
      console.error("요청 오류:", error.message);
    }
  }
};

export default bookmarkPolicy;
