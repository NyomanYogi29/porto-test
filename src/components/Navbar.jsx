import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import toggleDarkModeIcon from '../assets/toggle-dark-mode.svg';
import toggleLightModeIcon from '../assets/toggle-light-mode.svg';

export default function Navbar({ isDark, onToggleTheme }) {
  const [cooldown, setCooldown] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const isTugasJs = location.pathname === '/tugas-js';

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleThemeClick = () => {
    if (cooldown > 0) return;

    onToggleTheme();
    setCooldown(3);
  };

  const navItemClass = (isActive = false) =>
    `inline-block transition-colors duration-200 ${
      isActive
        ? isDark
          ? 'text-cyan-400 font-semibold'
          : 'text-blue-600 font-semibold'
        : isDark
        ? 'text-neutral-300 hover:text-white'
        : 'text-neutral-700 hover:text-black'
    }`;

  const handleLogoClick = (event) => {
    event.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.history.pushState(null, '', window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      setTimeout(() => {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    }
  };

  const mobileBtnClass = `flex min-h-11 items-center justify-center rounded-lg border-2 px-3 text-xs font-semibold backdrop-blur-md transition-all duration-200 active:scale-95 ${
    isDark
      ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
      : 'border-black/20 bg-black/10 text-black hover:bg-black/20'
  }`;

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 backdrop-blur-md ${
        isDark ? 'bg-black/35' : 'bg-white/35'
      }`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <a
          href="/"
          onClick={handleLogoClick}
          className="cursor-pointer text-2xl font-extrabold tracking-tight transition-opacity hover:opacity-80 md:text-2xl md:font-bold"
        >
          NYG
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-base font-medium">
            <li>
              <a
                href="#about"
                onClick={(event) => handleNavClick(event, 'about')}
                className={navItemClass()}
              >
                <span className="text-neutral-500">1. </span>About me
              </a>
            </li>
            <li>
              <a
                href="#interested"
                onClick={(event) => handleNavClick(event, 'interested')}
                className={navItemClass()}
              >
                <span className="text-neutral-500">2. </span>Interested in
              </a>
            </li>
            <li>
              <a
                href="#education"
                onClick={(event) => handleNavClick(event, 'education')}
                className={navItemClass()}
              >
                <span className="text-neutral-500">3. </span>Education
              </a>
            </li>
            <li>
              <a
                href="#connect"
                onClick={(event) => handleNavClick(event, 'connect')}
                className={navItemClass()}
              >
                <span className="text-neutral-500">4. </span>Connect with me
              </a>
            </li>
            <li>
              <Link
                to="/tugas-js"
                className={navItemClass(isTugasJs)}
              >
                <span className="text-neutral-500">5. </span>Tugas JS
              </Link>
            </li>
            <li className="sm:ml-4">
              <button
                type="button"
                onClick={handleThemeClick}
                disabled={cooldown > 0}
                className={`flex min-h-11 w-[205px] items-center justify-center gap-2 rounded-lg border-2 px-4 py-1.5 text-sm font-semibold backdrop-blur-md transition-all duration-200 ${
                  cooldown > 0
                    ? 'cursor-not-allowed opacity-50'
                    : 'cursor-pointer hover:scale-105 active:scale-95'
                } ${
                  isDark
                    ? 'border-white bg-white/10 text-white hover:bg-white/20'
                    : 'border-black bg-black/10 text-black hover:bg-black/20'
                }`}
              >
                <img
                  src={isDark ? toggleLightModeIcon : toggleDarkModeIcon}
                  alt=""
                  aria-hidden="true"
                  className={`h-4.5 w-4.5 shrink-0 ${isDark ? 'invert' : ''}`}
                />
                <span className="truncate">
                  {cooldown > 0
                    ? `Cooldown (${cooldown}s)`
                    : isDark
                    ? 'Switch to Light Mode'
                    : 'Switch to Dark Mode'}
                </span>
              </button>
            </li>
          </ul>
        </nav>

        {/* Mobile controls: Switcher link + Theme toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {isTugasJs ? (
            <Link to="/" className={mobileBtnClass}>
              Portofolio
            </Link>
          ) : (
            <Link to="/tugas-js" className={mobileBtnClass}>
              Tugas JS
            </Link>
          )}

          <button
            type="button"
            onClick={handleThemeClick}
            disabled={cooldown > 0}
            aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className={`flex h-11 w-11 items-center justify-center rounded-lg border-2 backdrop-blur-md transition-all duration-200 ${
              cooldown > 0
                ? 'cursor-not-allowed opacity-50'
                : 'cursor-pointer active:scale-95'
            } ${
              isDark
                ? 'border-white bg-white/10 text-white'
                : 'border-black bg-black/10 text-black'
            }`}
          >
            {cooldown > 0 ? (
              <span className="text-base font-bold animate-pulse">{cooldown}</span>
            ) : (
              <img
                src={isDark ? toggleLightModeIcon : toggleDarkModeIcon}
                alt=""
                aria-hidden="true"
                className={`h-5 w-5 ${isDark ? 'invert' : ''}`}
              />
            )}
          </button>
        </div>
      </div>

      <div
        className={`h-[1px] w-full ${
          isDark
            ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent'
            : 'bg-gradient-to-r from-transparent via-black/15 to-transparent'
        }`}
      />
    </header>
  );
}
