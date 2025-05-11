import springAPI from "../../config/springApi";

/**
 * 인증 코드 확인 API 호출
 * @param {string} email - 사용자의 이메일
 * @param {string} authCode - 사용자 입력 인증 코드
 * @returns 응답 객체 또는 에러
 */

const confirmEmailVerification = async (email, authCode) => {
    try {
        const res = await springAPI.post('/auth/verification', {
            email,
            authCode,
        });
        console.log(res)
        return res;
    } catch (error) {
        console.error('인증 확인 오류: ', error);
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
}

export default confirmEmailVerification;