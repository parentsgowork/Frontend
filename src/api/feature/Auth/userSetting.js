// src/api/feature/User/userSettingAPI.js
import springAPI from "../../config/springApi";

/**
 * 회원 탈퇴 API
 * 사용자의 계정을 삭제합니다.
 * @returns {Promise<AxiosResponse>}
 */
export const deactivateUser = async () => {
  try {
    const res = await springAPI.patch("/users");
    console.log("회원 탈퇴 성공:", res);
    return res;
  } catch (error) {
    console.error("회원 탈퇴 실패:", error);
    throw error;
  }
};

/**
 * 비밀번호 변경 API
 * @param {Object} payload
 * @param {boolean} payload.isVerified - 인증 여부
 * @param {string} payload.email - 사용자 이메일
 * @param {string} payload.password - 새 비밀번호
 * @param {string} payload.passwordCheck - 새 비밀번호 확인
 * @returns {Promise<AxiosResponse>}
 */
export const changePassword = async (payload) => {
  try {
    const res = await springAPI.patch("/users/password", payload);
    console.log("비밀번호 변경 성공:", res);
    return res;
  } catch (error) {
    console.error("비밀번호 변경 실패:", error);
    throw error;
  }
};
