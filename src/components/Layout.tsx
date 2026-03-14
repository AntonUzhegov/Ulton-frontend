import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Проверяем, находимся ли мы на странице входа или регистрации
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Если это страница авторизации, показываем только children без меню
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Link to="/">
              <span className="logo-text">Ulanton Courses</span>
            </Link>
          </div>

          <nav className="nav-menu">
            <Link to="/" className="nav-link">Главная</Link>
            <Link to="/about" className="nav-link">О нас</Link>
            <Link to="/allCourses" className="nav-link">Курсы</Link>
            <Link to="/contacts" className="nav-link">Контакты</Link>
          </nav>

          <div className="auth-section">
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">
                  {user?.firstName || user?.username || 'Пользователь'}
                </span>
                <button onClick={handleLogout} className="logout-btn">
                  Выйти
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="login-btn">Войти</Link>
                <Link to="/register" className="register-btn">Регистрация</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-info">
            <p>© 2024 Ulanton Courses. Все права защищены.</p>
          </div>
          <div className="footer-links">
            <Link to="/about">О нас</Link>
            <Link to="/contacts">Контакты</Link>
            <Link to="/privacy">Политика конфиденциальности</Link>
          </div>
        </div>
      </footer>

      <style>{`
        .app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .header {
          background: rgba(10, 10, 15, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 16px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo a {
          text-decoration: none;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, #7dd3ff, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-menu {
          display: flex;
          gap: 32px;
        }

        .nav-link {
          color: rgba(255,255,255,0.8);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: #7dd3ff;
        }

        .auth-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-name {
          color: rgba(255,255,255,0.9);
          font-weight: 500;
        }

        .logout-btn {
          padding: 8px 16px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .logout-btn:hover {
          background: rgba(255,255,255,0.15);
          border-color: rgba(125,211,255,0.3);
        }

        .auth-buttons {
          display: flex;
          gap: 12px;
        }

        .login-btn, .register-btn {
          padding: 8px 16px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .login-btn {
          color: white;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .login-btn:hover {
          background: rgba(255,255,255,0.15);
        }

        .register-btn {
          background: linear-gradient(135deg, #7dd3ff, #a78bfa);
          color: #0a0a0f;
          border: none;
        }

        .register-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(125, 211, 255, 0.3);
        }

        .main-content {
          flex: 1;
          max-width: 1400px;
          margin: 0 auto;
          padding: 24px;
          width: 100%;
        }

        .footer {
          background: rgba(10, 10, 15, 0.95);
          border-top: 1px solid rgba(255,255,255,0.1);
          margin-top: auto;
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 32px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-info p {
          color: rgba(255,255,255,0.6);
          margin: 0;
        }

        .footer-links {
          display: flex;
          gap: 24px;
        }

        .footer-links a {
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: #7dd3ff;
        }

        @media (max-width: 768px) {
          .header-container {
            flex-direction: column;
            gap: 16px;
          }
          
          .nav-menu {
            flex-wrap: wrap;
            justify-content: center;
            gap: 16px;
          }
          
          .footer-container {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
          
          .footer-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;