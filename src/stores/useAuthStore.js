import { create } from "zustand";

export const useAuthStore = create((set) => ({
    accessToken : null,
    refreshToken : null,
    isLoggedIn : false,
    isInitialized : false,

    // 초기상태 복원
    restoreState: () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        
        set({
            accessToken : accessToken || null,
            refreshToken : refreshToken || null,
            isLoggedIn : !!accessToken,
            isInitialized : true,
        })
    },

    // 로그인
    login: (accessToken, refreshToken) => {
        if (accessToken) localStorage.setItem('accessToken', accessToken);
        if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
        
        set({
            accessToken,
            refreshToken,
            isLoggedIn: true,
        });
    },

    // 로그아웃
    logout: () => {
        ['accessToken', 'refreshToken'].forEach(token => {
            if (token) localStorage.removeItem(token);
        });
        
        set({
            accessToken: null,
            refreshToken: null,
            isLoggedIn: false,
        });
    }
}));

export default useAuthStore;
