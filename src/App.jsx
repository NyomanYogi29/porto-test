import { useState } from 'react';
import Navbar from './components/Navbar';
import About from './components/About';
import Interested from './components/Interested';
import Education from './components/Education';
import Footer from './components/Footer';
import CursorTrail from './components/CursorTrail';
import blackHoleImg from './assets/black-hole.jpg';
import whiteHoleImg from './assets/white-hole.jpg';
import cyberpunkLinesImg from './assets/cyberpunk-dark-mode.jpg';
import cyberpunkLightImg from './assets/cyberpunk-light-mode.jpg';

function App() {
  const [isDark, setIsDark] = useState(true);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div
      className={`min-h-dvh overflow-x-clip transition-colors duration-300 ${
        isDark ? 'bg-black text-neutral-100' : 'bg-white text-neutral-900'
      }`}
    >
      {/* Ambient Black Hole in top-left corner (Dark Mode) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-0 select-none transition-opacity duration-700 ease-in-out ${
          isDark ? 'opacity-20' : 'opacity-0'
        }`}
        style={{
          maskImage: 'radial-gradient(circle at top left, black 35%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at top left, black 35%, transparent 80%)',
        }}
      >
        <img
          src={blackHoleImg}
          alt=""
          className="h-auto w-[500px] max-w-none object-cover object-left-top sm:w-[650px] lg:w-[800px]"
        />
      </div>

      {/* Ambient White Hole in top-left corner (Light Mode) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-0 select-none transition-opacity duration-700 ease-in-out ${
          !isDark ? 'opacity-20' : 'opacity-0'
        }`}
        style={{
          maskImage: 'radial-gradient(circle at top left, black 35%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at top left, black 35%, transparent 80%)',
        }}
      >
        <img
          src={whiteHoleImg}
          alt=""
          className="h-auto w-[500px] max-w-none object-cover object-left-top sm:w-[650px] lg:w-[800px]"
        />
      </div>

      {/* Ambient Cyberpunk Lines on the right side, slightly below center (Dark Mode) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed right-0 top-[52%] z-0 -translate-y-1/4 select-none transition-opacity duration-700 ease-in-out ${
          isDark ? 'opacity-12' : 'opacity-0'
        }`}
        style={{
          maskImage: 'radial-gradient(ellipse at right center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at right center, black 30%, transparent 80%)',
        }}
      >
        <img
          src={cyberpunkLinesImg}
          alt=""
          className="h-auto w-[340px] max-w-none object-cover object-right sm:w-[440px] lg:w-[540px]"
        />
      </div>

      {/* Ambient Cyberpunk Lines on the right side, slightly below center (Light Mode) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed right-0 top-[52%] z-0 -translate-y-1/4 select-none transition-opacity duration-700 ease-in-out ${
          !isDark ? 'opacity-12' : 'opacity-0'
        }`}
        style={{
          maskImage: 'radial-gradient(ellipse at right center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at right center, black 30%, transparent 80%)',
        }}
      >
        <img
          src={cyberpunkLightImg}
          alt=""
          className="h-auto w-[340px] max-w-none object-cover object-right sm:w-[440px] lg:w-[540px]"
        />
      </div>

      <CursorTrail isDark={isDark} />

      <Navbar isDark={isDark} onToggleTheme={handleToggleTheme} />

      <main className="relative z-10 mx-auto max-w-5xl px-6">
        <About isDark={isDark} />
        <Interested isDark={isDark} />
        <Education isDark={isDark} />
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}

export default App;
