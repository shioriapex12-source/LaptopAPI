// pages/AuthPage.jsx
import { useState } from 'react';
import LoginCard from '../components/LoginCard.jsx';
import RegisterCard from '../components/RegisterCard.jsx';
import PageHeader from '../components/PageHeader.jsx';
import { login, registerUser } from '../services/authService.js';

function AuthPage({ onSetMessage, onLoginSuccess, onLogout }) {
  const [registerForm, setRegisterForm] = useState({ email: '', pwd: '' });
  const [loginForm, setLoginForm] = useState({ email: '', pwd: '' });

  const onRegister = async (e) => {
    e.preventDefault();
    onSetMessage('');

    try {
      const data = await registerUser(registerForm);
      onSetMessage(typeof data === 'string' ? data : 'Đăng ký thành công. Vui lòng check email.');
      setRegisterForm({ email: '', pwd: '' });
    } catch (err) {
      onSetMessage(err.message || 'Lỗi kết nối khi đăng ký.');
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    onSetMessage('');

    try {
      const data = await login(loginForm);
      localStorage.setItem('token', data.token);
      onLoginSuccess(data.token);
      onSetMessage('Đăng nhập thành công.');
      setLoginForm({ email: '', pwd: '' });
    } catch (err) {
      onSetMessage(err.message || 'Lỗi kết nối khi đăng nhập.');
    }
  };

  return (
    <>
      <PageHeader title="Authentication" description="Đăng ký tài khoản và đăng nhập." />
      <div className="row g-3 mb-4">
        <RegisterCard form={registerForm} onChange={setRegisterForm} onSubmit={onRegister} />
        <LoginCard form={loginForm} onChange={setLoginForm} onSubmit={onLogin} onLogout={onLogout} />
      </div>
    </>
  );
}

export default AuthPage;
