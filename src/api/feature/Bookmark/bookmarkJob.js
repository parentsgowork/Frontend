// src/api/feature/Bookmark/bookmarkJob.js
import springAPI from "../../config/springApi";

/**
 * 채용 정보 북마크 저장
 * @param {number} jobId - 채용 정보 ID
 * @param {number} page - 페이지 번호
 * @returns {Promise<AxiosResponse>}
 */
const bookmarkJob = async (jobInfos) => {
  console.log("채용정보 북마크 저장 요청:", jobInfos);
  try {
    const res = await springAPI.post("/jobInfo/add", jobInfos);
    console.log("채용 북마크 저장 성공:", res);
    return res;
  } catch (error) {
    console.error("채용 북마크 저장 실패:", error);
    throw error;
  }
};


/**
 * 내가 저장한 구직정보 리스트 조회
 * @returns {Promise<AxiosResponse>} 구직정보 리스트
 */
const getBookmarkedJobs = async () => {
  console.log("📄 구직정보 북마크 리스트 조회 요청");

  try {
    const res = await springAPI.get("/jobInfo");
    console.log("✅ 구직정보 조회 성공:", res.data.result);
    return res;
  } catch (error) {
    console.error("구직정보 리스트 조회 실패:", error);
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


/**
 * 특정 구직정보 조회
 * @param {number} jobInfoId - 구직정보 ID
 * @returns {Promise<AxiosResponse>} 구직정보 상세
 */
const getBookmarkedJobById = async (jobInfoId) => {
  console.log(`📄 구직정보(ID: ${jobInfoId}) 조회 요청`);

  try {
    const res = await springAPI.get(`/jobInfo/${jobInfoId}`);
    console.log("✅ 구직정보 상세 조회 성공:", res.data.result);
    return res;
  } catch (error) {
    console.error("구직정보 상세 조회 실패:", error);
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

/**
 * 특정 구직정보 삭제
 * @param {number} jobInfoId - 삭제할 구직정보 ID
 * @returns {Promise<AxiosResponse>} 삭제 결과
 */
const deleteBookmarkedJob = async (jobInfoId) => {
  console.log(`🗑️ 구직정보(ID: ${jobInfoId}) 삭제 요청`);

  try {
    const res = await springAPI.delete(`/jobInfo/${jobInfoId}`);
    console.log("✅ 구직정보 삭제 성공:", res.data.result);
    return res;
  } catch (error) {
    console.error("구직정보 삭제 실패:", error);
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

export { bookmarkJob, getBookmarkedJobs, getBookmarkedJobById, deleteBookmarkedJob };
