import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import LaptopsPage from './pages/LaptopsPage';

function App() {
  const [message, setMessage] = useState('');

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setMessage('Logout Successfully');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout message={message} />} >
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<AuthPage
          onSetMessage={setMessage}
          onLoginSuccess={setToken}
          onLogout={logout}/>}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
