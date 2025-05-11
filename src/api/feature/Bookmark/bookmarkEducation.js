// src/api/feature/Bookmark/bookmarkEducation.js
import pythonAPI from "../../config/pythonApi";

/**
 * 교육 정보 북마크 저장 API
 *
 * @param {number} userId - 사용자 ID
 * @param {Array<{title: string, url: string}>} bookmarks - 북마크할 교육 정보 목록
 * @returns {Promise<AxiosResponse>} 서버 응답
 */
const bookmarkEducation = async (userId, bookmarks) => {
  try {
    const res = await pythonAPI.post("/api/education/bookmark", {
      user_id: userId,
      bookmarks,
    });
    console.log("교육 북마크 저장 성공:", res);
    return res;
  } catch (error) {
    console.error("교육 북마크 저장 실패:", error);
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

export default bookmarkEducation;
