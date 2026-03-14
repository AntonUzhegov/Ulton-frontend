import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import coursesService from '../services/courses';
import { Course } from '../types';

const Home: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    coursesService.getAll()
      .then(data => setCourses(data.slice(0, 3)))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div className="content-container">

      <br />
      <br />
      <h1>Ваш лучший <span style={{ color: 'rgb(132, 192, 248)' }}>путь в IT</span></h1>

      <div className="blocks-container">
        {/* Первая строка */}
        <div className="block-item">
          <div className="block-title">Java Spring</div>
          <div className="block-content">
            Современный фреймворк для создания enterprise-приложений на Java. Изучите Spring Boot, Security, Data и другие модули.
          </div>
        </div>

        <div className="block-item">
          <div className="block-title">Java для начинающих</div>
          <div className="block-content">
            Основы программирования на Java: синтаксис, ООП, коллекции, исключения. Идеальный старт для новичков в разработке.
          </div>
        </div>

        <div className="block-item">
          <div className="block-title">Java для продвинутых</div>
          <div className="block-content">
            Продвинутые темы: многопоточность, паттерны проектирования, оптимизация производительности, работа с памятью.
          </div>
        </div>

        {/* Вторая строка - Python */}
        <div className="block-item">
          <div className="block-title">Python для начинающих</div>
          <div className="block-content">
            Основы программирования на Python: синтаксис, типы данных, функции, ООП. Идеальный старт для новичков в разработке.
          </div>
        </div>

        {/* Плитка SQL */}
        <div className="block-item">
          <div className="block-title">SQL и базы данных</div>
          <div className="block-content">
            Работа с реляционными базами данных: сложные запросы, оптимизация, транзакции, проектирование схем данных.
          </div>
        </div>

        <Link to="/allCourses" className="block-item-simple" style={{ textDecoration: 'none' }}>
          <div className="simple-text">Начать учиться</div>
        </Link>
      </div>

      <style>{`
        .block-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(109, 69, 255, 0.15);
          background-color: rgba(255, 255, 255, 0.12);
        }
      `}</style>
    </div>
  );
};

export default Home;