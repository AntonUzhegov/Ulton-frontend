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
      <h1>HOME <span style={{ color: 'rgb(132, 192, 248)' }}></span></h1>

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

        {/* Вторая строка */}
        <div className="block-item">
          <div className="block-title">Python для продвинутых</div>
          <div className="block-content">
            Веб-разработка на Django/Flask, анализ данных, машинное обучение, асинхронное программирование, оптимизация кода.
          </div>
        </div>

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
    </div>
  );
};

export default Home;