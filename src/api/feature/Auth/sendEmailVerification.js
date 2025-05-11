// src/api/Auth/sendVerificationEmail.js
import springAPI from "../../config/springApi";
// import axios from "axios";

/**
 * 인증 메일 전송 API
 * 
 * @param {string} email - 사용자 이메일 주소
 * @param {'SIGNUP' | 'PASSWORD_RESET'} type - 인증 타입 (쿼리 파라미터로 전달)
 * @returns {Promise<AxiosResponse>} 응답 객체
 */

const sendEmailVerification = async (email, type) => {
  try {
    console.log("BASE URL", springAPI.defaults.baseURL);
    console.log("요청 데이터: ", email, ",", type);
    const res = await springAPI.post(`/auth/email?type=${type}`,{
        email
    });
    console.log("인증 메일 전송 응답:", res);
    return res;
  } catch (error) {
        console.error('인증 메일 전송 실패: ', error);
		if (error.response) {
			//서버 응답이 있는 경우
			console.error('응답 상태 코드: ', error.response.status);
			console.error('응답 데이터:', error.response.data);
		} else if (error.request) {
			//요청이 보내졌지만 응답을 받지 못한 경우
			console.error('응답 없음: ', error.request);
		} else {
			//요청 설정 중에 오류가 발생한 경우
			console.error('요청 설정 오류: ', error.message);
		}
    }
};

export default sendEmailVerification;
