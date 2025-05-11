// src/api/Auth/signupWithEmail.js
import springAPI from "../../config/springApi"; // 또는 axios 직접 구성 가능

/**
 * 이메일 회원가입 API
 *
 * @param {Object} signupData - 회원가입 정보
 * @param {boolean} signupData.isVerified - 이메일 인증 여부
 * @param {string} signupData.email - 이메일 주소
 * @param {string} signupData.name - 이름
 * @param {string} signupData.password - 비밀번호 (8~30자)
 * @param {number} signupData.age - 나이
 * @param {'MALE'|'FEMALE'} signupData.gender - 성별
 * @param {string} signupData.region - 지역 (예: 'SEOUL')
 * @param {string} signupData.job - 직업
 * @param {number} signupData.career - 경력 (숫자)
 * @param {'HIGH_SCHOOL'|'ASSOCIATE'|'BACHELOR'|'MASTER'|'DOCTOR'} signupData.finalEdu - 최종 학력
 * @returns {Promise<AxiosResponse>} 응답 객체
 */

const signupWithEmail = async (signupData) => {
  try {
    console.log("회원가입 요청 데이터:", signupData);
    const res = await springAPI.post("/auth/signup", signupData);
    console.log("회원가입 성공 응답:", res);
    return res;
  } catch (error) {
    console.error("회원가입 실패: ", error);
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

export default signupWithEmail;
