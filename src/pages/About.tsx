import React from 'react';

const About: React.FC = () => {
  return (
    <div className="content-container aboutx">
      <section className="hero">
        <div className="hero__bg"></div>
        <div className="hero__content">
          <h1>О <span className="it-accent">нас</span></h1>
          <p className="hero__lead">
            Мы делаем IT‑обучение прикладным: шаг за шагом, с мини-проектами и простым языком.
          </p>

          <div className="hero__cta">
            <a href="/allCourses" className="btn-primary">Выбрать курс</a>
            <a href="/contacts" className="btn-ghost">Задать вопрос</a>
          </div>

          <div className="hero__facts" aria-label="Короткие факты">
            <div className="fact">
              <div className="fact__v">Теория</div>
            </div>
            <div className="fact">
              <div className="fact__v">Мини-Проекты</div>
            </div>
            <div className="fact">
              <div className="fact__v">Поддержка</div>
            </div>
          </div>
        </div>
      </section>

      <section className="timeline" aria-label="Как устроено обучение">
        <h2 className="section-title">Как мы учим</h2>

        <div className="steps">
          <div className="step">
            <div className="step__n">01</div>
            <div className="step__body">
              <div className="step__t">Понимаете базу</div>
              <div className="step__d">Короткие уроки + шпаргалки — чтобы быстро схватить суть и не утонуть в теории.</div>
            </div>
          </div>

          <div className="step">
            <div className="step__n">02</div>
            <div className="step__body">
              <div className="step__t">Закрепляете на практике</div>
              <div className="step__d">Ошибки — это часть процесса, мы помогаем пройти их быстрее.</div>
            </div>
          </div>

          <div className="step">
            <div className="step__n">03</div>
            <div className="step__body">
              <div className="step__t">Растёте системно</div>
              <div className="step__d">Траектория от простого к сложному: закрываем пробелы и укрепляем фундамент.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="split" aria-label="Для кого и что внутри">
        <div className="split__left">
          <h2 className="section-title">Для кого</h2>
          <ul className="bullets">
            <li><span className="bullet-dot"></span><b>Новички</b> — старт без боли: объясняем простым языком.</li>
            <li><span className="bullet-dot"></span><b>Практикующие</b> — прокачка стека и уверенности в решениях.</li>
            <li><span className="bullet-dot"></span><b>Команды</b> — рост компетенций внутри компании и единые стандарты.</li>
          </ul>
        </div>

        <div className="split__right">
          <h2 className="section-title">Что внутри курсов</h2>

          <div className="meter">
            <div className="meter__row">
              <div className="meter__label">Практика</div>
              <div className="meter__bar"><span style={{ width: '20%' }}></span></div>
              <div className="meter__val">20%</div>
            </div>
            <div className="meter__row">
              <div className="meter__label">Проекты</div>
              <div className="meter__bar"><span style={{ width: '5%' }}></span></div>
              <div className="meter__val">5%</div>
            </div>
            <div className="meter__row">
              <div className="meter__label">Теория</div>
              <div className="meter__bar"><span style={{ width: '75%' }}></span></div>
              <div className="meter__val">75%</div>
            </div>
          </div>

           <div className="mini">
            <div className="mini__item">
              <div className="mini__k">Формат</div>
              <div className="mini__v">уроки → задания → разбор</div>
            </div>
            <div className="mini__item">
              <div className="mini__k">Материалы</div>
              <div className="mini__v">шаблоны, чек‑листы, примеры</div>
            </div>
            <div className="mini__item">
              <div className="mini__k">Результат</div>
              <div className="mini__v">системность знаний</div>
            </div>
          </div>
        </div>
      </section>

      <section className="principle-section">
        <div className="note principle-note">
          <div className="note__title">Принцип</div>
          <div className="note__text">Теория — как опора. Главный прогресс приходит через задания и проекты.</div>
        </div>
      </section>

      <section className="cta" aria-label="Связаться">
        <div className="cta__card">
          <div className="cta__left">
            <h2 className="cta__t">Не уверены с выбором?</h2>
            <p className="cta__d">
              Напишите нам — подскажем подходящий курс и траекторию под вашу цель.
            </p>
          </div>
          <div className="cta__right">
            <a href="/contacts" className="btn-primary">Связаться</a>
            <a href="/allCourses" className="btn-ghost">Смотреть курсы</a>
          </div>
        </div>
      </section>

      <style>{`
        .aboutx { padding-top: 8px; }
        .hero {
          position: relative;
          border-radius: 26px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.06);
          padding: clamp(22px, 3vw, 34px);
          box-shadow: 0 22px 60px rgba(0,0,0,.28);
          margin-bottom: 28px;
        }
        .hero__bg {
          position:absolute; inset:-2px;
          background:
            radial-gradient(600px 320px at 15% 25%, rgba(125,211,255,.22), transparent 60%),
            radial-gradient(520px 320px at 60% 10%, rgba(167,139,250,.20), transparent 60%),
            radial-gradient(560px 340px at 85% 70%, rgba(34,197,94,.18), transparent 62%);
          filter: blur(2px);
          opacity: .95;
        }
        .hero__content{ position:relative; z-index:1; }
        .hero__lead{
          margin-top: 10px;
          max-width: 900px;
          font-size: clamp(16px, 1.2vw, 20px);
          line-height: 1.6;
          color: rgba(255,255,255,0.90);
          text-shadow: 0 12px 38px rgba(0,0,0,.25);
        }
        .hero__cta{
          display:flex; flex-wrap:wrap; gap: 14px;
          margin-top: 18px;
        }
        .btn-primary, .btn-ghost{
          display:inline-flex; align-items:center; justify-content:center;
          padding: 12px 18px;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          text-decoration:none;
          transition: transform .18s ease, background .18s ease, border-color .18s ease, box-shadow .18s ease;
          user-select:none;
        }
        .btn-primary{
          background: rgba(26,79,179,0.95);
          border: 1px solid rgba(125,211,255,0.25);
          color: white;
          box-shadow: 0 16px 40px rgba(0,0,0,.25);
        }
        .btn-primary:hover{ transform: translateY(-2px); background: rgba(42,95,208,0.98); }
        .btn-ghost{
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.92);
        }
        .btn-ghost:hover{ transform: translateY(-2px); border-color: rgba(125,211,255,0.22); }

        .hero__facts{
          margin-top: 18px;
          display:grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }
        .fact{
          padding: 14px 14px;
          border-radius: 18px;
          background: rgba(0,0,0,0.16);
          border: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .fact__v{
          font-size: 16px;
          font-weight: 700;
          color: rgba(255,255,255,0.92);
        }

        .section-title{
          margin: 10px 0 16px;
          font-size: clamp(22px, 2vw, 30px);
          font-weight: 700;
        }

        .timeline{
          margin: 6px 0 22px;
          padding: 10px 2px;
        }
        .steps{
          display:flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
        }
        .step{
          position: relative;
          display:flex;
          gap: 16px;
          padding: 16px 18px;
          border-radius: 18px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          overflow:hidden;
        }
        .step::before{
          content:"";
          position:absolute;
          left:0; top:0; bottom:0;
          width: 4px;
          background: linear-gradient(180deg, rgba(125,211,255,.85), rgba(167,139,250,.65), rgba(34,197,94,.55));
          opacity: .9;
        }
        .step__n{
          min-width: 56px;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: .08em;
          color: rgba(255,255,255,0.92);
          opacity: .85;
        }
        .step__t{
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 6px;
        }
        .step__d{
          font-size: 16px;
          line-height: 1.55;
          color: rgba(255,255,255,0.86);
        }

        .split{
          display:grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 18px;
          margin: 18px 0 26px;
        }
        .split__left, .split__right{
          border-radius: 22px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.10);
          padding: 18px 18px;
        }
        .bullets{
          list-style:none;
          display:flex;
          flex-direction: column;
          gap: 12px;
          padding: 6px 0 0;
          margin: 0;
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255,255,255,0.90);
        }
        .bullets li{ display:flex; gap: 10px; align-items:flex-start; }
        .bullet-dot{
          width: 10px; height: 10px; border-radius: 50%;
          margin-top: 9px;
          background: linear-gradient(90deg, rgba(125,211,255,.9), rgba(167,139,250,.9));
          box-shadow: 0 0 16px rgba(125,211,255,.18);
          flex: 0 0 10px;
        }

        /* Стили для блока "Принцип" */
        .principle-section {
          margin: 18px 0 26px;
        }
        .principle-note {
          margin-top: 0;
          padding: 14px 14px;
          border-radius: 18px;
          background: rgba(0,0,0,0.16);
          border: 1px solid rgba(255,255,255,0.10);
        }
        .note__title{
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: .12em;
          color: rgba(255,255,255,0.72);
          margin-bottom: 6px;
        }
        .note__text{
          font-size: 16px;
          color: rgba(255,255,255,0.90);
          line-height: 1.55;
        }

        .meter{
          display:flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 6px;
        }
        .meter__row{
          display:grid;
          grid-template-columns: 110px 1fr 52px;
          align-items:center;
          gap: 12px;
        }
        .meter__label{
          font-size: 15px;
          color: rgba(255,255,255,0.86);
        }
        .meter__bar{
          height: 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.10);
          overflow:hidden;
          border: 1px solid rgba(255,255,255,0.10);
        }
        .meter__bar span{
          display:block;
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #7dd3ff, #a78bfa, #22c55e);
        }
        .meter__val{
          font-size: 14px;
          font-weight: 800;
          color: rgba(255,255,255,0.90);
          text-align:right;
        }

        .mini{
          margin-top: 16px;
          display:grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }
        .mini__item{
          padding: 12px 12px;
          border-radius: 16px;
          background: rgba(0,0,0,0.14);
          border: 1px solid rgba(255,255,255,0.10);
        }
        .mini__k{
          font-size: 13px;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.72);
          margin-bottom: 6px;
        }
        .mini__v{
          font-size: 16px;
          font-weight: 700;
          color: rgba(255,255,255,0.92);
        }

        .cta{
          margin: 6px 0 18px;
        }
        .cta__card{
          display:flex;
          align-items:center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 18px;
          border-radius: 22px;
          background: linear-gradient(145deg, rgba(125,211,255,0.10), rgba(167,139,250,0.10));
          border: 1px solid rgba(255,255,255,0.12);
        }
        .cta__t{
          font-size: clamp(20px, 1.8vw, 28px);
          font-weight: 800;
          margin: 0 0 8px;
        }
        .cta__d{
          margin: 0;
          font-size: 16px;
          line-height: 1.55;
          color: rgba(255,255,255,0.88);
          max-width: 760px;
        }
        .cta__right{ display:flex; flex-wrap:wrap; gap: 12px; }

        @media (max-width: 900px){
          .hero__facts{ grid-template-columns: 1fr; }
          .split{ grid-template-columns: 1fr; }
          .cta__card{ flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
};

export default About;