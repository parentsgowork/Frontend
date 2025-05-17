// src/api/feature/Bookmark/bookmarkPolicy.js
import pythonAPI from "../../config/pythonApi";
import springAPI from "../../config/springApi";

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


/**
 * 내가 저장한 고용 정책/복지 리스트 조회
 * @returns {Promise<AxiosResponse>} 고용 정책/복지 리스트
 */
const getBookmarkedPolicies = async () => {
  console.log("📑 고용 정책/복지 북마크 리스트 조회 요청");

  try {
    const res = await springAPI.get("/policyInfo");
    console.log("✅ 고용 정책/복지 리스트 조회 성공:", res.data.result);
    return res;
  } catch (error) {
    console.error("고용 정책/복지 리스트 조회 실패:", error);
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
 * 특정 고용 정책/복지 정보 조회
 * @param {number} policyInfoId - 정책/복지 ID
 * @returns {Promise<AxiosResponse>} 고용 정책/복지 상세
 */
const getBookmarkedPolicyById = async (policyInfoId) => {
  console.log(`📑 고용 정책/복지(ID: ${policyInfoId}) 조회 요청`);

  try {
    const res = await springAPI.get(`/policyInfo/${policyInfoId}`);
    console.log("✅ 고용 정책/복지 조회 성공:", res.data.result);
    return res;
  } catch (error) {
    console.error("고용 정책/복지 조회 실패:", error);
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
 * 특정 고용 정책/복지 정보 삭제
 * @param {number} policyInfoId - 삭제할 정책/복지 ID
 * @returns {Promise<AxiosResponse>} 삭제 결과
 */
const deleteBookmarkedPolicy = async (policyInfoId) => {
  console.log(`🗑️ 고용 정책/복지(ID: ${policyInfoId}) 삭제 요청`);

  try {
    const res = await springAPI.delete(`/policyInfo/${policyInfoId}`);
    console.log("✅ 고용 정책/복지 삭제 성공:", res.data.result);
    return res;
  } catch (error) {
    console.error("고용 정책/복지 삭제 실패:", error);
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

export {
  bookmarkPolicy,
  getBookmarkedPolicies,
  getBookmarkedPolicyById,
  deleteBookmarkedPolicy,
};