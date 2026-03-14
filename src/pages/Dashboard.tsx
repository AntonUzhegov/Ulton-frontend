import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import coursesService from '../services/courses';

interface UserCourse {
  id: number;
  title: string;
  progress: number;
  lastLesson?: string;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedLessons: 0,
    totalTime: 0
  });

  useEffect(() => {
    // Загрузка данных пользователя
    Promise.all([
      // Здесь должен быть API запрос для получения курсов пользователя
      // Пока используем моковые данные
      new Promise(resolve => setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'Java для начинающих',
            progress: 45,
            lastLesson: 'Урок 5: Условные операторы'
          },
          {
            id: 2,
            title: 'Java Spring',
            progress: 15,
            lastLesson: 'Урок 2: Dependency Injection'
          }
        ]);
      }, 1000))
    ]).then(([courses]) => {
      setUserCourses(courses as UserCourse[]);
      setStats({
        totalCourses: (courses as UserCourse[]).length,
        completedLessons: 12,
        totalTime: 8
      });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="content-container">
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner-circle"></div>
            <div className="spinner-circle"></div>
            <div className="spinner-circle"></div>
          </div>
          <p className="loading-text">Загружаем ваш прогресс...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <div className="dashboard-header">
        <h1>Личный кабинет</h1>
        <p className="welcome-text">С возвращением, {user?.firstName || user?.username || 'студент'}! 👋</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalCourses}</div>
            <div className="stat-label">Активных курсов</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-value">{stats.completedLessons}</div>
            <div className="stat-label">Пройдено уроков</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalTime}ч</div>
            <div className="stat-label">Времени обучения</div>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h2>Мои курсы</h2>
          <Link to="/allCourses" className="view-all-link">Все курсы →</Link>
        </div>

        {userCourses.length === 0 ? (
          <div className="empty-state">
            <p>У вас пока нет курсов</p>
            <Link to="/allCourses" className="btn-primary">Выбрать курс</Link>
          </div>
        ) : (
          <div className="courses-progress">
            {userCourses.map(course => (
              <div key={course.id} className="course-progress-card">
                <div className="course-progress-header">
                  <h3 className="course-progress-title">{course.title}</h3>
                  <span className="course-progress-percent">{course.progress}%</span>
                </div>
                
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>

                {course.lastLesson && (
                  <div className="last-lesson">
                    <span className="last-lesson-label">Последний урок:</span>
                    <span className="last-lesson-name">{course.lastLesson}</span>
                  </div>
                )}

                <Link to={`/courses/${course.id}`} className="continue-btn">
                  Продолжить обучение →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-section">
        <h2>Рекомендуемые курсы</h2>
        <div className="recommended-courses">
          <div className="recommended-card">
            <h3>Python для начинающих</h3>
            <p>Изучите основы программирования на Python</p>
            <Link to="/courses/python-basics" className="recommended-link">Посмотреть →</Link>
          </div>
          <div className="recommended-card">
            <h3>SQL и базы данных</h3>
            <p>Научитесь работать с данными эффективно</p>
            <Link to="/courses/sql-databases" className="recommended-link">Посмотреть →</Link>
          </div>
        </div>
      </div>

      <style>{`
        .dashboard-header {
          margin-bottom: 32px;
        }

        .welcome-text {
          font-size: 18px;
          color: rgba(255,255,255,0.8);
          margin-top: 8px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon {
          font-size: 32px;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: white;
          line-height: 1.2;
        }

        .stat-label {
          color: rgba(255,255,255,0.6);
          font-size: 14px;
        }

        .dashboard-section {
          margin-bottom: 40px;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .view-all-link {
          color: #7dd3ff;
          text-decoration: none;
          font-size: 16px;
        }

        .view-all-link:hover {
          text-decoration: underline;
        }

        .courses-progress {
          display: grid;
          gap: 16px;
        }

        .course-progress-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 20px;
        }

        .course-progress-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .course-progress-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .course-progress-percent {
          font-size: 18px;
          font-weight: 700;
          color: #7dd3ff;
        }

        .progress-bar {
          height: 8px;
          background: rgba(255,255,255,0.1);
          border-radius: 999px;
          margin-bottom: 12px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #7dd3ff, #a78bfa);
          border-radius: 999px;
          transition: width 0.3s ease;
        }

        .last-lesson {
          margin-bottom: 16px;
          font-size: 14px;
        }

        .last-lesson-label {
          color: rgba(255,255,255,0.5);
          margin-right: 8px;
        }

        .last-lesson-name {
          color: rgba(255,255,255,0.9);
        }

        .continue-btn {
          display: inline-block;
          color: #7dd3ff;
          text-decoration: none;
          font-weight: 500;
        }

        .continue-btn:hover {
          text-decoration: underline;
        }

        .recommended-courses {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .recommended-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 20px;
        }

        .recommended-card h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
        }

        .recommended-card p {
          color: rgba(255,255,255,0.7);
          margin-bottom: 16px;
          font-size: 14px;
        }

        .recommended-link {
          color: #7dd3ff;
          text-decoration: none;
          font-weight: 500;
        }

        .empty-state {
          text-align: center;
          padding: 48px;
          background: rgba(255,255,255,0.04);
          border-radius: 16px;
        }

        .empty-state p {
          color: rgba(255,255,255,0.7);
          margin-bottom: 20px;
          font-size: 16px;
        }

        .btn-primary {
          display: inline-block;
          padding: 12px 24px;
          background: linear-gradient(135deg, #7dd3ff, #a78bfa);
          border-radius: 12px;
          color: #0a0a0f;
          text-decoration: none;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .recommended-courses {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;