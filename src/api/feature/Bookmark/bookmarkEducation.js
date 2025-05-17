// src/api/feature/Bookmark/bookmarkEducation.js
import pythonAPI from "../../config/pythonApi";
import springAPI from "../../config/springApi";

/**
 * 교육 정보 북마크 저장 API
 *
 * @param {number} userId - 사용자 ID
 * @param {Array<{title: string, url: string}>} bookmarks - 북마크할 교육 정보 목록
 * @returns {Promise<AxiosResponse>} 서버 응답
 */
const bookmarkEducation = async (bookmarks) => {
  console.log("교육정보 북마크 저장 요청:", bookmarks);
  try {
    const res = await pythonAPI.post("/api/education/bookmark", {
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


/**
 * 내가 저장한 교육정보 리스트 조회
 * @returns {Promise<AxiosResponse>} 교육정보 리스트
 */
const getBookmarkedEducations = async () => {
  console.log("📚 교육정보 북마크 리스트 조회 요청");

  try {
    const res = await springAPI.get("/educationInfo");
    console.log("✅ 교육정보 조회 성공:", res.data.result);
    return res;
  } catch (error) {
    console.error("교육 정보 북마크 조회 실패:", error);
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

/**
 * 특정 교육정보 조회
 * @param {number} educationInfoId - 교육정보 ID
 * @returns {Promise<AxiosResponse>} 교육정보 상세
 */
const getBookmarkedEducationById = async (educationInfoId) => {
  console.log(`📚 교육정보(ID: ${educationInfoId}) 조회 요청`);

  try {
    const res = await springAPI.get(`/educationInfo/${educationInfoId}`);
    console.log("✅ 교육정보 조회 성공:", res.data.result);
    return res;
  } catch (error) {
    console.error("특정 교육 정보 북마크 조회 실패:", error);
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

/**
 * 내가 저장한 특정 교육정보 삭제
 * @param {number} educationInfoId - 삭제할 교육정보 ID
 * @returns {Promise<AxiosResponse>} 삭제 결과
 */
const deleteBookmarkedEducation = async (educationInfoId) => {
  console.log(`🗑️ 교육정보(ID: ${educationInfoId}) 삭제 요청`);

  try {
    const res = await springAPI.delete(`/educationInfo/${educationInfoId}`);
    console.log("✅ 교육정보 삭제 성공:", res.data.result);
    return res;
  } catch (error) {
    console.error("교육 정보 북마크 삭제 실패:", error);
    if (error.response) {
      console.error("응답 상태 코드:", error.response.status);
      console.error("응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("응답 없음:", error.request);
    } else {
      console.error("요청 오류:", error.message);
    }
    throw error;
  }
};


export { bookmarkEducation, getBookmarkedEducations, getBookmarkedEducationById, deleteBookmarkedEducation };
