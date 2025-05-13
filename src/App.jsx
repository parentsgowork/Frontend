import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { setupSpringInterceptors } from './api/config/setupSpringInterceptors';
import { setupPythonInterceptors } from './api/config/setupPythonInterceptors';
import springAPI from './api/config/springApi';
import pythonAPI from './api/config/pythonApi';
import { useAuthStore } from './stores/useAuthStore';
import ApiTest from './pages/ApiTest';
import Layout from './components/Layout';
import Home from './pages/Home';
import SignupForm from './pages/Signup';
import Login from './pages/Login';
import ChatbotPage from './pages/ChatbotPage';
import RequireAuth from './components/RequireAuth';



const App = () => {
  const navigate = useNavigate();

  // 앱 시작 시 인터셉터 초기화
  useEffect(() => {
    useAuthStore.getState().restoreState();
    setupSpringInterceptors(springAPI, navigate);
    setupPythonInterceptors(pythonAPI, navigate);
  }
  , [navigate]);

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* NO REDIRECTION */}
        <Route path="/api-test" element={<ApiTest />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* REQUIRED AUTH */}
        <Route path="/chatbot/:topic?/:category?" element={<RequireAuth><ChatbotPage /></RequireAuth>} />
      </Route>
    </Routes>
  );
};

export default App;
