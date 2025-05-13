// src/api/Auth/loginWithEmail.js
import springAPI from "../../config/springApi"; // 또는 axios 직접 생성

/**
 * 이메일 로그인 API
 *
 * @param {Object} loginData - 로그인 정보
 * @param {string} loginData.email - 사용자 이메일
 * @param {string} loginData.password - 사용자 비밀번호
 * @returns {Promise<AxiosResponse>} 응답 객체
 * 
 * 응답 예시:
 * {
 *   isSuccess: true,
 *   code: "COMMON200",
 *   message: "성공입니다.",
 *   result: {
 *     accessToken: "...",
 *     refreshToken: "..."
 *   }
 * }
 */
const loginWithEmail = async (loginData) => {
  try {
    console.log("로그인 요청 데이터:", loginData);
    const res = await springAPI.post("/auth/login", loginData);
    console.log("로그인 성공 응답:", res);
    return res.data.result;
  } catch (error) {
    console.error("로그인 실패: ", error);
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

export default loginWithEmail;
