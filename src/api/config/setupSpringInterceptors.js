import useAuthStore from "../../stores/useAuthStore";

export const setupSpringInterceptors = (apiInstance, navigate) => {
    // 요청 인터셉터
    apiInstance.interceptors.request.use(
        (config) => {
            const token = useAuthStore.getState().token;
            if(token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // 응답 인터셉터
    apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { logout } = useAuthStore.getState();

        if(error.response?.status === 403) {
            // 403 Forbidden 에러 발생 시 로그아웃 처리
            console.warn('Token expired or invalid. Logging out.');
            logout();
            navigate('/login');
            return;
        }

        return Promise.reject(error);
    }    
    )
}


