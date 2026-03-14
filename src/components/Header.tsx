import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
	const location = useLocation();
	const { user, isAuthenticated, logout } = useAuth();
	const menuRef = useRef<HTMLUListElement>(null);
	const underlineRef = useRef<HTMLSpanElement>(null);

	const isActive = (path: string) => location.pathname === path;

	// Список страниц, где нужно показывать логотип
	const showLogoOnPages = ['/']; // Добавьте нужные пути
	
	// Проверяем, нужно ли показывать логотип на текущей странице
	const shouldShowLogo = showLogoOnPages.includes(location.pathname);

	useEffect(() => {
		const menu = menuRef.current;
		const underline = underlineRef.current;
		
		if (!menu || !underline) return;

		const links = Array.from(menu.querySelectorAll('.menu-item a'));
		const activeLink = menu.querySelector('.menu-item-active a') as HTMLElement | null;

		function moveTo(link: HTMLElement) {
			if (!menu || !underline) return;
			const r = link.getBoundingClientRect();
			const mr = menu.getBoundingClientRect();
			underline.style.width = r.width + 'px';
			underline.style.transform = `translateX(${r.left - mr.left}px)`;
		}

		underline.classList.add('no-anim');
		if (activeLink) {
			moveTo(activeLink);
		} else if (links.length > 0) {
			moveTo(links[0] as HTMLElement);
		}

		requestAnimationFrame(() => {
			if (underline) underline.classList.remove('no-anim');
		});

		const handleMouseEnter = (link: HTMLElement) => () => moveTo(link);
		const handleFocus = (link: HTMLElement) => () => moveTo(link);

		links.forEach(link => {
			const htmlLink = link as HTMLElement;
			htmlLink.addEventListener('mouseenter', handleMouseEnter(htmlLink));
			htmlLink.addEventListener('focus', handleFocus(htmlLink));
		});

		const handleMouseLeave = () => {
			if (activeLink) {
				moveTo(activeLink);
			} else if (links.length > 0) {
				moveTo(links[0] as HTMLElement);
			}
		};

		menu.addEventListener('mouseleave', handleMouseLeave);

		const handleResize = () => {
			if (activeLink) {
				moveTo(activeLink);
			} else if (links.length > 0) {
				moveTo(links[0] as HTMLElement);
			}
		};

		window.addEventListener('resize', handleResize);

		return () => {
			links.forEach(link => {
				const htmlLink = link as HTMLElement;
				htmlLink.removeEventListener('mouseenter', handleMouseEnter(htmlLink));
				htmlLink.removeEventListener('focus', handleFocus(htmlLink));
			});
			menu.removeEventListener('mouseleave', handleMouseLeave);
			window.removeEventListener('resize', handleResize);
		};
	}, [location]);

	// ✅ Проверка на страницы авторизации - ПОСЛЕ всех хуков
	const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
	
	// Если это страница авторизации - не показываем хедер
	if (isAuthPage) {
		return null;
	}

	return (
		<header>
			<nav>
				<ul className="left-menu" ref={menuRef}>
					<li className={`menu-item ${isActive('/') ? 'menu-item-active' : ''}`}>
						<Link to="/">Главная</Link>
					</li>
					<li className={`menu-item ${isActive('/allCourses') ? 'menu-item-active' : ''}`}>
						<Link to="/allCourses">Каталог курсов</Link>
					</li>
					<li className={`menu-item ${isActive('/contacts') ? 'menu-item-active' : ''}`}>
						<Link to="/contacts">Контакты</Link>
					</li>
					<li className={`menu-item ${isActive('/about') ? 'menu-item-active' : ''}`}>
						<Link to="/about">О нас</Link>
					</li>
					<span className="menu-underline no-anim" ref={underlineRef} aria-hidden="true"></span>
				</ul>
			</nav>

			{/* Логотип показывается только на определенных страницах */}
			{shouldShowLogo && <div className="logo">Ulton</div>}

			<nav>
				<ul className="right-menu">
					{isAuthenticated ? (
						<li className="menu-item" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
							<span style={{ color: 'white' }}>{user?.username}</span>
							<li className="menu-item login-btn">
								<button onClick={logout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
									Выйти
								</button>
							</li>
						</li>
					) : (
						<li className="menu-item login-btn">
							<Link to="/login">Войти</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Header;