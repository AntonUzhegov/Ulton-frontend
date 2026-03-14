import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const MenuUnderline: React.FC = () => {
  const underlineRef = useRef<HTMLSpanElement>(null);
  const location = useLocation();

  useEffect(() => {
    const menu = document.querySelector('.left-menu');
    if (!menu || !underlineRef.current) return;

    const activeLink = menu.querySelector('.menu-item-active a') as HTMLElement;
    if (!activeLink) return;

    const moveUnderline = () => {
      const r = activeLink.getBoundingClientRect();
      const mr = menu.getBoundingClientRect();
      if (underlineRef.current) {
        underlineRef.current.style.width = r.width + 'px';
        underlineRef.current.style.transform = `translateX(${r.left - mr.left}px)`;
      }
    };

    moveUnderline();
    window.addEventListener('resize', moveUnderline);

    return () => window.removeEventListener('resize', moveUnderline);
  }, [location]);

  return <span ref={underlineRef} className="menu-underline no-anim" aria-hidden="true"></span>;
};

export default MenuUnderline;