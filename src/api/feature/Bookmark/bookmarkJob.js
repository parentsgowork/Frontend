// src/api/feature/Bookmark/bookmarkJob.js
import springAPI from "../../config/springApi";

/**
 * 채용 정보 북마크 저장
 * @param {number} jobId - 채용 정보 ID
 * @param {number} page - 페이지 번호
 * @returns {Promise<AxiosResponse>}
 */
const bookmarkJob = async (jobId, page) => {
  try {
    const res = await springAPI.post("/bookmark", {
      jobId,
      page,
    });
    console.log("채용 북마크 저장 성공:", res);
    return res;
  } catch (error) {
    console.error("채용 북마크 저장 실패:", error);
    throw error;
  }
};

export default bookmarkJob;
