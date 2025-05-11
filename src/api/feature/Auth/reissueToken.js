// src/api/Auth/reissueToken.js
import springAPI from "../../config/springApi"; // 또는 axios 직접 사용 가능

/**
 * 토큰 재발급 API
 *
 * @param {string} refreshToken - 저장된 리프레시 토큰
 * @returns {Promise<AxiosResponse>} 응답 객체 (새로운 AccessToken 등 포함)
 */
const reissueToken = async (refreshToken) => {
  try {
    console.log("토큰 재발급 요청:", refreshToken);
    const res = await springAPI.post("/auth/reissue", {
      refreshToken: refreshToken
    });
    console.log("토큰 재발급 성공 응답:", res);
    return res;
  } catch (error) {
    console.error("토큰 재발급 실패: ", error);
    if (error.response) {
      console.error("응답 상태 코드: ", error.response.status);
      console.error("응답 데이터:", error.response.data);
    } else if (error.request) {
      console.error("응답 없음: ", error.request);
    } else {
      console.error("요청 설정 오류: ", error.message);
    }
  }
};

export default reissueToken;
