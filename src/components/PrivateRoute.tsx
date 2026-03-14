import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
        </div>
        <p className="loading-text">Загрузка...</p>

        <style>{`
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 400px;
          }
          .loading-spinner {
            display: flex;
            gap: 8px;
            margin-bottom: 16px;
          }
          .spinner-circle {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: linear-gradient(135deg, #7dd3ff, #a78bfa);
            animation: bounce 0.6s infinite alternate;
          }
          .spinner-circle:nth-child(2) {
            animation-delay: 0.2s;
          }
          .spinner-circle:nth-child(3) {
            animation-delay: 0.4s;
          }
          @keyframes bounce {
            to {
              transform: translateY(-10px);
              opacity: 0.8;
            }
          }
          .loading-text {
            color: rgba(255,255,255,0.7);
            font-size: 16px;
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;