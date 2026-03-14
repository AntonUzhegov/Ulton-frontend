import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.username, formData.password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="auth-page">
      {/* Кнопка назад */}
      <button onClick={handleGoBack} className="auth-back-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Назад
      </button>

      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Вход в систему</h1>

          {error && <div className="alert alert-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Email или логин</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-input"
                value={formData.username}
                onChange={handleChange}
                placeholder="example@mail.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Пароль</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                placeholder="Введите пароль"
                required
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" name="remember-me" className="checkbox-input" />
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Запомнить меня</span>
              </label>
            </div>

            <button type="submit" className={`auth-btn ${loading ? 'loading' : ''}`} disabled={loading}>
              <span className="btn-text">{loading ? 'Вход...' : 'Войти'}</span>
            </button>
          </form>

          <div className="auth-links">
            <Link to="/forgot-password" className="auth-link">Забыли пароль?</Link>
            <Link to="/register" className="auth-link">Регистрация</Link>
          </div>

          <div className="auth-footer">
            <p>Входя в систему, вы соглашаетесь с <Link to="/terms">Пользовательским соглашением</Link> и <Link to="/privacy">Политикой конфиденциальности</Link></p>
          </div>
        </div>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #0d1424;
          position: relative;
          overflow: hidden;
        }

        .auth-back-button {
          position: absolute;
          top: 30px;
          left: 30px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .auth-back-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(125, 211, 255, 0.3);
          transform: translateX(-3px);
        }

        .auth-back-button svg {
          width: 20px;
          height: 20px;
        }

        .auth-container {
          width: 100%;
          max-width: 450px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .auth-card {
          width: 100%;
          padding: 50px;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          background: linear-gradient(135deg, rgba(13, 20, 36, 0.9), rgba(26, 36, 63, 0.9));
        }

        .auth-title {
          font-size: 36px;
          font-weight: 600;
          margin-bottom: 40px;
          text-align: center;
          background: linear-gradient(135deg, #5a9cff, #a78bfa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-label {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .form-input {
          background-color: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          padding: 14px 18px;
          color: white;
          font-size: 16px;
          font-family: 'Montserrat', sans-serif;
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: #5a9cff;
          box-shadow: 0 0 0 3px rgba(90, 156, 255, 0.15);
          background-color: rgba(255, 255, 255, 0.12);
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .form-options {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 5px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
        }

        .checkbox-label input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #5a9cff;
          cursor: pointer;
        }

        .auth-btn {
          background: linear-gradient(135deg, #1a4fb3, #2a5fd0);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 16px;
          font-size: 16px;
          font-weight: 600;
          font-family: 'Montserrat', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
        }

        .auth-btn:hover {
          background: linear-gradient(135deg, #2a5fd0, #3a6fe0);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(42, 95, 208, 0.4);
        }

        .auth-btn:active {
          transform: translateY(0);
        }

        .auth-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .auth-links {
          display: flex;
          justify-content: space-between;
          margin-top: 25px;
          font-size: 14px;
        }

        .auth-link {
          color: #5a9cff;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          padding: 5px 0;
        }

        .auth-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #5a9cff;
          transition: width 0.3s ease;
        }

        .auth-link:hover {
          color: #7bb2ff;
        }

        .auth-link:hover::after {
          width: 100%;
        }

        .auth-footer {
          text-align: center;
          margin-top: 40px;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.5;
        }

        .auth-footer a {
          color: #5a9cff;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .auth-footer a:hover {
          color: #7bb2ff;
          text-decoration: underline;
        }

        .alert {
          padding: 15px 20px;
          border-radius: 12px;
          margin-bottom: 25px;
          font-size: 14px;
          font-weight: 500;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .alert-error {
          background-color: rgba(255, 107, 107, 0.1);
          border: 1px solid rgba(255, 107, 107, 0.3);
          color: #ff6b6b;
        }

        @media (max-width: 768px) {
          .auth-card {
            padding: 40px 30px;
          }

          .auth-title {
            font-size: 32px;
          }

          .auth-back-button {
            top: 20px;
            left: 20px;
            padding: 8px 16px;
          }
        }

        @media (max-width: 480px) {
          .auth-card {
            padding: 30px 20px;
          }

          .auth-title {
            font-size: 28px;
          }

          .auth-links {
            flex-direction: column;
            gap: 15px;
            align-items: center;
          }

          .auth-back-button {
            top: 15px;
            left: 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;