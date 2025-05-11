// src/api/feature/Bookmark/bookmarkAPI.js
import springAPI from "../../config/springApi";

/**
 * 내 전체 북마크 리스트 조회
 * @returns {Promise<AxiosResponse>}
 */
export const fetchAllBookmarks = async () => {
  try {
    const res = await springAPI.get("/bookmark");
    console.log("전체 북마크 조회 성공:", res);
    return res;
  } catch (error) {
    console.error("전체 북마크 조회 실패:", error);
    throw error;
  }
};

/**
 * 특정 북마크 상세 조회
 * @param {number} bookmarkId - 조회할 북마크 ID
 * @returns {Promise<AxiosResponse>}
 */
export const fetchBookmarkById = async (bookmarkId) => {
  try {
    const res = await springAPI.get(`/bookmark/${bookmarkId}`);
    console.log("북마크 상세 조회 성공:", res);
    return res;
  } catch (error) {
    console.error("북마크 상세 조회 실패:", error);
    throw error;
  }
};

/**
 * 특정 북마크 삭제
 * @param {number} bookmarkId - 삭제할 북마크 ID
 * @returns {Promise<AxiosResponse>}
 */
export const deleteBookmarkById = async (bookmarkId) => {
  try {
    const res = await springAPI.delete(`/bookmark/${bookmarkId}`);
    console.log("북마크 삭제 성공:", res);
    return res;
  } catch (error) {
    console.error("북마크 삭제 실패:", error);
    throw error;
  }
};
