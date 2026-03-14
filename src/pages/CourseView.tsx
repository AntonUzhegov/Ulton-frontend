import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import coursesService from '../services/courses';
import { Course, Lesson } from '../types';

const CourseView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [activeLessonPos, setActiveLessonPos] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      Promise.all([
        coursesService.getBySlug(slug),
        coursesService.getLessons(slug)
      ]).then(([courseData, lessonsData]) => {
        setCourse(courseData);
        setLessons(lessonsData);
        if (lessonsData.length > 0) {
          setCurrentLesson(lessonsData[0]);
          setActiveLessonPos(lessonsData[0].position);
        }
        setLoading(false);
      }).catch(err => {
        console.error('Error fetching course:', err);
        setLoading(false);
      });
    }
  }, [slug]);

  useEffect(() => {
    // Восстановление скролла списка уроков
    const list = document.querySelector('.lesson-list');
    if (!list) return;

    const key = `lessonListScroll:${slug}`;
    const saved = sessionStorage.getItem(key);
    if (saved !== null) {
      list.scrollTop = parseInt(saved, 10) || 0;
    }

    // Если активный элемент не виден, прокрутить к нему
    const active = list.querySelector('.lesson-item--active');
    if (active) {
      const listRect = list.getBoundingClientRect();
      const itemRect = active.getBoundingClientRect();
      const isAbove = itemRect.top < listRect.top;
      const isBelow = itemRect.bottom > listRect.bottom;

      if (isAbove || isBelow) {
        active.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [slug, lessons]);

  const handleLessonClick = async (position: number) => {
    if (slug) {
      // Сохраняем позицию скролла
      const list = document.querySelector('.lesson-list');
      if (list) {
        const key = `lessonListScroll:${slug}`;
        sessionStorage.setItem(key, String(list.scrollTop));
      }

      // Загружаем урок
      const lesson = await coursesService.getLesson(slug, position);
      setCurrentLesson(lesson);
      setActiveLessonPos(position);
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

  if (loading) return <div>Загрузка...</div>;
  if (!course) return <div>Курс не найден</div>;

  return (
    <div className="content-container">
      <h1>{course.title}</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '22px', marginTop: '18px' }}>
        {/* Левая колонка: список уроков */}
        <aside style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '18px', padding: '16px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
            <div className={`course-card__badge ${getBadgeClass(course.badge)}`}>
              {course.badge || 'Base'}
            </div>
            <div style={{ opacity: 0.85 }}>{course.difficulty}</div>
          </div>

          <div style={{ opacity: 0.85, fontSize: '16px', lineHeight: '1.5', marginBottom: '12px' }}>
            {course.shortDescription}
          </div>

          <div style={{ marginTop: '14px', fontSize: '16px', opacity: 0.9, fontWeight: 700 }}>
            Уроки
          </div>

          <div className="lesson-list">
            {lessons.map(lesson => (
              <div
                key={lesson.id}
                onClick={() => handleLessonClick(lesson.position)}
                className={`lesson-item ${lesson.position === activeLessonPos ? 'lesson-item--active' : ''}`}
                data-lesson-pos={lesson.position}
                style={{ cursor: 'pointer' }}
              >
                {lesson.position}. {lesson.title}
              </div>
            ))}
          </div>
        </aside>

        {/* Правая колонка: контент урока */}
        <section style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: '18px', padding: '18px' }}>
          {!currentLesson ? (
            <div style={{ opacity: 0.9 }}>Урок не найден.</div>
          ) : (
            <>
              <h2 style={{ marginBottom: '12px' }}>
                {currentLesson.position}. {currentLesson.title}
              </h2>
              <article className="lesson-content" style={{ whiteSpace: 'pre-wrap' }}>
                {currentLesson.content}
              </article>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default CourseView;