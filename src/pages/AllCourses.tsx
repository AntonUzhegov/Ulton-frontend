import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import coursesService from '../services/courses';
import { Course } from '../types';

const AllCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingCourseId, setAddingCourseId] = useState<number | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    coursesService.getAll()
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching courses:', err);
        setLoading(false);
      });
  }, []);

  const handleAddCourse = async (e: React.MouseEvent, courseId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/courses' } });
      return;
    }
    
    setAddingCourseId(courseId);
    
    // Имитация добавления курса (замените на реальный API вызов)
    try {
      // await userService.addCourse(courseId);
      setTimeout(() => {
        setAddingCourseId(null);
        // Показать уведомление об успехе
      }, 1000);
    } catch (error) {
      console.error('Error adding course:', error);
      setAddingCourseId(null);
    }
  };

  const getBadgeClass = (badge: string) => {
    const t = badge?.toLowerCase() || '';
    if (t === 'backend') return 'badge--backend';
    if (t === 'base') return 'badge--base';
    if (t === 'advanced') return 'badge--adv';
    if (t === 'python') return 'badge--python';
    if (t === 'data') return 'badge--data';
    return 'badge--base';
  };

  // Красивый компонент загрузки
  if (loading) {
    return (
      <div className="content-container">
        <h1>Каталог <span className="it-accent">курсов</span></h1>
        
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner-circle"></div>
            <div className="spinner-circle"></div>
            <div className="spinner-circle"></div>
          </div>
          <p className="loading-text">Загружаем курсы...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <h1>Каталог <span className="it-accent">курсов</span></h1>
      
      {courses.length === 0 ? (
        <div className="empty-state">
          <p>Курсы пока не добавлены</p>
        </div>
      ) : (
        <div className="course-list">
          {courses.map(course => (
            <Link 
              to={isAuthenticated ? `/courses/${course.slug}` : '#'} 
              key={course.id} 
              className="course-card"
              onClick={(e) => !isAuthenticated && e.preventDefault()}
            >
              <div className="course-card__left">
                <div className={`course-card__badge ${getBadgeClass(course.badge)}`}>
                  {course.badge || 'Base'}
                </div>

                <div className="course-card__title">{course.title}</div>

                <div className="course-card__meta">
                  <span className="course-card__meta-item">{course.durationWeeks} недель</span>
                  <span className="course-card__dot">•</span>
                  <span className="course-card__meta-item">{course.lessonsCount} уроков</span>
                </div>

                <div className="course-card__desc">{course.shortDescription}</div>
              </div>

              <div className="course-card__right">
                <div className="course-card__stats">
                  <div className="course-card__stat">
                    <div className="course-card__stat-label">Сложность</div>
                    <div className="course-card__stat-value">{course.difficulty}</div>
                  </div>
                  <div className="course-card__stat">
                    <div className="course-card__stat-label">Доступно</div>
                    <div className="course-card__stat-value">Сейчас</div>
                  </div>
                </div>

                <button 
                  className={`course-card__add ${addingCourseId === course.id ? 'course-card__add--loading' : ''}`}
                  type="button"
                  disabled={addingCourseId === course.id}
                  onClick={(e) => handleAddCourse(e, course.id)}
                >
                  {addingCourseId === course.id ? (
                    <>
                      <span className="button-spinner"></span>
                      Добавление...
                    </>
                  ) : (
                    isAuthenticated ? 'Добавить' : 'Войти'
                  )}
                </button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourses;