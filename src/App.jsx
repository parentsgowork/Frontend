import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setupSpringInterceptors } from './api/config/setupSpringInterceptors';
import springAPI from './api/config/springApi';
import { useAuthStore } from './stores/useAuthStore';
import Layout from './components/Layout';
import Home from './pages/Home';
import SignupForm from './pages/Signup';
import ApiTest from './pages/ApiTest';


const App = () => {
  const navigate = useNavigate();

  // 앱 시작 시 인터셉터 초기화
  useEffect(() => {
    useAuthStore.getState().restoreState();
    setupSpringInterceptors(springAPI, navigate);
  }
  , [navigate]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/api-test" element={<ApiTest />} />
      </Route>
    </Routes>
  );
};

export default App;
