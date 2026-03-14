import React, { useState } from 'react';
import api from '../services/api';

const Contacts: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: ''
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await api.post('/contacts/send', formData);
      setStatus({ type: 'success', message: response.data.message });
      setFormData({
        name: '',
        email: '',
        topic: '',
        message: ''
      });
    } catch (err: any) {
      setStatus({ 
        type: 'error', 
        message: err.response?.data?.message || 'Ошибка отправки сообщения' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-container contacts-container">
      <section className="contacts-hero">
        <div className="contacts-hero__bg"></div>
        <div className="contacts-hero__content">
          <h1>Наши <span className="it-accent">контакты</span></h1>
          <p className="contacts-hero__lead">
            Мы всегда на связи и готовы помочь вам с выбором курса, техническими вопросами или любыми другими обращениями.
          </p>
        </div>
      </section>

      {status && (
        <div className={`alert alert-${status.type}`}>
          {status.message}
        </div>
      )}

      <div className="contacts-grid">
        {/* Левая колонка: контактная информация */}
        <div className="contact-info">
          <h2 className="contacts-title">Свяжитесь с нами</h2>

          <div className="contact-cards-container">
            <div className="contact-card">
              <div className="contact-card__title">
                <div className="contact-icon">📧</div>
                <span>Email</span>
              </div>
              <div className="contact-card__content">
                <p>Основные вопросы: <a href="mailto:ulton22@gmail.com">ulton22@gmail.com</a></p>
                <p>Техподдержка: <a href="mailto:ulian123@gmail.com">ulian123@gmail.com</a></p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__title">
                <div className="contact-icon">📍</div>
                <span>Адрес</span>
              </div>
              <div className="contact-card__content">
                <p>г. Калуга, ул. Тверская, д. 7</p>
                <p>Бизнес-центр "Тверской"</p>
                <p>Этаж 5, офис 502</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card__title">
                <div className="contact-icon">🕒</div>
                <span>Режим работы</span>
              </div>
              <div className="contact-card__content">
                <p>Понедельник - Пятница: 9:00 - 20:00</p>
                <p>Суббота: 10:00 - 18:00</p>
                <p>Воскресенье: выходной</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2 className="contacts-title">Форма обратной связи</h2>
          <p style={{ 
            color: 'rgba(255,255,255,0.8)', 
            marginBottom: '32px', 
            marginTop: '8px',       
            fontSize: '18px'
          }}>
            Заполните форму ниже, и мы свяжемся с вами в ближайшее время
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Ваше имя </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                placeholder="Максим Иванов"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Ваш Email </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="topic" className="form-label">Тема обращения </label>
              <div className="select-wrapper">
                <select
                  id="topic"
                  name="topic"
                  className="form-input select-custom"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Выберите тему</option>
                  <option value="Выбор курса">Выбор курса</option>
                  <option value="Техническая поддержка">Техническая поддержка</option>
                  <option value="Сотрудничество">Сотрудничество</option>
                  <option value="Другое">Другое</option>
                </select>
                <div className="select-arrow">▼</div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Сообщение </label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                value={formData.message}
                onChange={handleChange}
                placeholder="Опишите ваш вопрос или проблему..."
                rows={5}
                required
              />
            </div>

            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Отправка...' : 'Отправить сообщение'}
            </button>
          </form>

          <div className="hours-info">
            <div className="hours-title">Время ответа</div>
            <div className="hours-text">
              Мы отвечаем на письма в течение 24 часов в рабочие дни.
            </div>
          </div>
        </div>
      </div>

      <section className="contacts-cta">
        <div className="contacts-cta__content">
          <h2 className="contacts-title">Нужна срочная помощь?</h2>
          <p className="contacts-cta__text">
            Если у вас возникли срочные вопросы, напишите нам напрямую на почту или воспользуйтесь формой выше.
          </p>
          <div className="contacts-cta__buttons">
            <a href="mailto:uzhegov2006@gmail.com" className="btn-primary">
              Написать на почту
            </a>
            <a href="/allCourses" className="btn-ghost">
              Смотреть курсы
            </a>
          </div>
        </div>
      </section>

      <style>{`
        .contacts-container { padding-top: 8px; }
        .contacts-hero {
          position: relative;
          border-radius: 26px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.06);
          padding: clamp(22px, 3vw, 34px);
          box-shadow: 0 22px 60px rgba(0,0,0,.28);
          margin-bottom: 28px;
        }
        .contacts-hero__bg {
          position: absolute;
          inset: -2px;
          background:
            radial-gradient(600px 320px at 15% 25%, rgba(125,211,255,.22), transparent 60%),
            radial-gradient(520px 320px at 60% 10%, rgba(167,139,250,.20), transparent 60%),
            radial-gradient(560px 340px at 85% 70%, rgba(34,197,94,.18), transparent 62%);
          filter: blur(2px);
          opacity: .95;
        }
        .contacts-hero__content { position: relative; z-index: 1; }
        .contacts-hero__lead {
          margin-top: 10px;
          max-width: 900px;
          font-size: clamp(16px, 1.2vw, 20px);
          line-height: 1.6;
          color: rgba(255,255,255,0.90);
          text-shadow: 0 12px 38px rgba(0,0,0,.25);
        }
        .contacts-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin: 28px 0;
        }
        .contact-info, .contact-form {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 22px;
          padding: 24px;
        }
        .contact-cards-container {
          margin-top: 24px;
        }
        .contact-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          padding: 20px;
          margin-bottom: 16px;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .contact-card:hover {
          transform: translateY(-2px);
          border-color: rgba(125,211,255,0.22);
        }
        .contact-card:last-child { margin-bottom: 0; }
        .contact-card__title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          font-size: 18px;
          font-weight: 700;
          color: rgba(255,255,255,0.95);
        }
        .contact-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(125,211,255,0.15);
          border-radius: 8px;
          color: #7dd3ff;
        }
        .contact-card__content {
          font-size: 16px;
          line-height: 1.5;
          color: rgba(255,255,255,0.85);
        }
        .contact-card__content a {
          color: #7dd3ff;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .contact-card__content a:hover {
          opacity: 0.8;
          text-decoration: underline;
        }
        .form-group { margin-bottom: 20px; }
        .form-label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .form-input, .form-textarea {
          width: 100%;
          padding: 12px 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 12px;
          color: white;
          font-size: 16px;
          font-family: 'Montserrat', sans-serif;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .form-input:focus, .form-textarea:focus {
          outline: none;
          border-color: rgba(125,211,255,0.5);
          box-shadow: 0 0 0 3px rgba(125,211,255,0.1);
        }
        .form-textarea { min-height: 120px; resize: vertical; }
        
        /* Стили для селекта */
        .select-wrapper {
          position: relative;
          width: 100%;
        }
        .select-custom {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          cursor: pointer;
          padding-right: 40px;
          color: rgba(255,255,255,0.8);
        }
        .select-custom option {
          background: #1a1a2e;
          color: white;
          padding: 12px;
          border: none;
        }
        .select-custom option:disabled {
          color: rgba(255,255,255,0.3);
        }
        .select-custom:focus {
          border-color: rgba(125,211,255,0.5);
          box-shadow: 0 0 0 3px rgba(125,211,255,0.1);
        }
        .select-arrow {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(125,211,255,0.7);
          pointer-events: none;
          font-size: 14px;
          transition: color 0.2s ease;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }
        .select-wrapper:hover .select-arrow {
          color: #7dd3ff;
        }
        .select-custom:focus + .select-arrow {
          color: #7dd3ff;
        }
        
        /* Стили для кнопки отправки в стиле сайта */
        .submit-button {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #7dd3ff 0%, #a78bfa 100%);
          border: none;
          border-radius: 12px;
          color: #0a0a0f;
          font-size: 16px;
          font-weight: 600;
          font-family: 'Montserrat', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(125, 211, 255, 0.2);
        }

        .submit-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(125, 211, 255, 0.3);
        }

        .submit-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 10px rgba(125, 211, 255, 0.2);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .submit-button:hover::before {
          left: 100%;
        }
        
        .hours-info {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .hours-title {
          font-size: 16px;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          margin-bottom: 8px;
        }
        .hours-text {
          font-size: 15px;
          color: rgba(255,255,255,0.8);
          line-height: 1.5;
        }
        .alert {
          padding: 12px 16px;
          border-radius: 12px;
          margin-bottom: 20px;
          font-weight: 600;
        }
        .alert-success {
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #22c55e;
        }
        .alert-error {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }
        .contacts-cta { margin: 28px 0; text-align: center; }
        .contacts-cta__content {
          max-width: 800px;
          margin: 0 auto;
          padding: 24px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
        }
        .contacts-cta__text {
          font-size: 18px;
          line-height: 1.6;
          color: rgba(255,255,255,0.9);
          margin-bottom: 20px;
        }
        .contacts-cta__buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
        }
        .btn-primary {
          padding: 14px 32px;
          background: linear-gradient(135deg, #7dd3ff 0%, #a78bfa 100%);
          border: none;
          border-radius: 12px;
          color: #0a0a0f;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          font-family: 'Montserrat', sans-serif;
          box-shadow: 0 4px 15px rgba(125, 211, 255, 0.2);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(125, 211, 255, 0.3);
        }
        .btn-ghost {
          padding: 14px 32px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.2);
          background: transparent;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
          display: inline-block;
          font-family: 'Montserrat', sans-serif;
        }
        .btn-ghost:hover {
          border-color: rgba(125,211,255,0.5);
          background: rgba(125,211,255,0.1);
          transform: translateY(-2px);
        }
        @media (max-width: 900px) {
          .contacts-grid { grid-template-columns: 1fr; }
          .contacts-cta__buttons { flex-direction: column; align-items: center; }
          .submit-button, .btn-primary, .btn-ghost { width: 100%; max-width: 300px; }
        }
      `}</style>
    </div>
  );
};

export default Contacts;