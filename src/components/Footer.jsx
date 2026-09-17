import threadsIcon from '../assets/threads-icon.svg';
import githubIcon from '../assets/github-icon.svg';
import linkedinIcon from '../assets/linkedin-icon.svg';

const socialLinks = [
  {
    name: 'GitHub',
    handle: '@NyomanYogi29',
    url: 'https://github.com/NyomanYogi29',
    icon: githubIcon,
  },
  {
    name: 'LinkedIn',
    handle: 'Nyoman Yogi Putra Arthawan',
    url: 'https://www.linkedin.com/in/i-nyoman-yogi-putra-arthawan-621b12346/',
    icon: linkedinIcon,
  },
  {
    name: 'Threads',
    handle: '@nyomanyogi._',
    url: 'https://www.threads.com/@nyomanyogi._',
    icon: threadsIcon,
  },
];

export default function Footer({ isDark }) {
  const borderClass = isDark ? 'border-neutral-800' : 'border-neutral-200';
  const cardClass = isDark
    ? 'border-neutral-800 bg-neutral-950/50 hover:border-neutral-700'
    : 'border-neutral-200 bg-neutral-50/80 hover:border-neutral-400';

  const titleClass = isDark ? 'text-white' : 'text-black';
  const subClass = isDark ? 'text-neutral-400' : 'text-neutral-600';

  return (
    <footer id="connect" className={`scroll-mt-24 mt-20 border-t py-16 ${borderClass}`}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
            Connect With Me
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Let&apos;s Connect
          </h2>
          <p className={`text-sm ${subClass}`}>
            Feel free to reach out for collaboration, discussion.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {socialLinks.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex min-h-24 flex-col items-center justify-center rounded-2xl border p-6 text-center transition-all duration-200 hover:-translate-y-0.5 ${cardClass}`}
            >
              <img
                src={item.icon}
                alt=""
                aria-hidden="true"
                className={`h-7 w-7 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isDark ? 'invert' : ''}`}
              />
              <span className={`mt-3 max-w-full truncate text-sm font-semibold ${titleClass}`}>
                {item.handle}
              </span>
            </a>
          ))}
        </div>

        <div className={`mt-12 flex flex-col items-center justify-between gap-3 border-t pt-8 text-xs sm:flex-row ${borderClass} ${subClass}`}>
          <p>© 2026 Nyoman Yogi. NYQuarters.</p>
          <p>Crafted with React, Vite, and Bun.</p>
        </div>
      </div>
    </footer>
  );
}
