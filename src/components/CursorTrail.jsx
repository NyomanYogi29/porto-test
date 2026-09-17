import { useEffect, useState } from 'react';

export default function CursorTrail({ isDark }) {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-30 hidden md:block"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className="h-[70vw] w-[70vw] rounded-full transition-colors duration-300"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.05) 35%, rgba(255, 255, 255, 0.01) 60%, transparent 70%)'
            : 'radial-gradient(circle, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.12) 35%, rgba(0, 0, 0, 0.03) 60%, transparent 70%)',
        }}
      />
    </div>
  );
}
