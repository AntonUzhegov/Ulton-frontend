import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, showProgress = false }) => {
  const getBadgeClass = (badge: string) => {
    const badgeLower = badge?.toLowerCase() || '';
    if (badgeLower.includes('base')) return 'badge--base';
    if (badgeLower.includes('backend')) return 'badge--backend';
    if (badgeLower.includes('python')) return 'badge--python';
    return 'badge--base';
  };

  return (
    <Link to={`/courses/${course.slug}`} className="course-card">
      <div className={`course-card__badge ${getBadgeClass(course.badge)}`}>
        {course.badge || 'Base'}
      </div>
      
      <h3 className="course-card__title">{course.title}</h3>
      
      <div className="course-card__meta">
        <span className="course-card__difficulty">{course.difficulty}</span>
        <span className="course-card__dot">•</span>
        <span>{course.lessonsCount} уроков</span>
        <span className="course-card__dot">•</span>
        <span>{course.durationWeeks} недель</span>
      </div>
      
      <p className="course-card__desc">{course.shortDescription}</p>
      
      <div className="course-tags">
        {course.tags?.split(',').map((tag, index) => (
          <span key={index} className="chip">{tag.trim()}</span>
        ))}
      </div>

      {showProgress && (
        <div className="course-card__progress">
          <div className="course-card__progress-bar" style={{ width: '0%' }}></div>
        </div>
      )}
    </Link>
  );
};

export default CourseCard;