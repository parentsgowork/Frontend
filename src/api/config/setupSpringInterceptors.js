import useAuthStore from "../../stores/useAuthStore";
import reissueToken from "../feature/Auth/reissueToken";

export const setupSpringInterceptors = (apiInstance, navigate) => {
    // 요청 인터셉터
    apiInstance.interceptors.request.use(
        (config) => {
            const {accessToken} = useAuthStore.getState();
            if(accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    let isRefreshing = false;
    let queue = [];

    // 응답 인터셉터
    apiInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const { logout, login, refreshToken } = useAuthStore.getState();
        const { response } = error;

        // 401 + AUTH4015 시 즉시 로그아웃
        if (response?.status === 401 && response?.data?.code === 'AUTH4015') {
            window.alert('로그인이 필요합니다. 다시 로그인해 주세요.');
            logout();
            navigate('/login');
            return Promise.reject(error); // 이후 로직에 전달
        }

        // 일반적인 401 → refresh 재발급
        if(error.response?.status === 401 && !originalRequest._retry) {
            if(!refreshToken) {
                console.warn('Refresh token not found. Logging out.');
                logout();
                navigate('/');
                return Promise.reject(error);
            }
            if(isRefreshing) {
                return new Promise(resolve => queue.push((at) => {
                    originalRequest.headers['Authorization'] = `Bearer ${at}`;
                    resolve(apiInstance(originalRequest));
                }));
            }
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await reissueToken(refreshToken);
                const { accessToken: newAT, refreshToken: newRT } = data.result ?? data;

                login(newAT, newRT);
                queue.forEach((callback) => callback(newAT));
                queue = [];

                originalRequest.headers['Authorization'] = `Bearer ${newAT}`;
                return apiInstance(originalRequest);
            } catch (err) {
                console.error('Token reissue failed:', err);
                queue.forEach((callback) => callback(null));
                queue = [];
                logout();
                navigate('/');
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }    
    )
}


