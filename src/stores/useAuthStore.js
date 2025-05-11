import { create } from "zustand";

const useAuthStore = create((set) => ({
    token : null,
    isLoggendIn : false,

    // 초기상태 복원
    restoreState: () => {
        const token = localStorage.getItem('token');
        
        set({
            token: token || null,
            isLoggedIn: !!token,
        })
    },

    // 로그인
    login: (token) => {
        if(token) localStorage.setItem('token', token);
        
        set({
            token,
            isLoggedIn: true,
        });
    }
}));

export default useAuthStore;
