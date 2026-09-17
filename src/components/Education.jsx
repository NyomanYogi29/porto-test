import undikshaLogo from '../assets/undiksha.png';
import smansakuLogo from '../assets/smansaku.jpg';
import onekutaLogo from '../assets/onekuta.png';
import sdonekutaLogo from '../assets/sdonekuta.jpg';

const educationList = [
  {
    level: 'Higher Education',
    institution: 'Ganesha University of Education',
    major: 'Bachelor of Computer Science',
    status: 'Undergraduate',
    logo: undikshaLogo,
  },
  {
    level: 'Senior High School',
    institution: 'Kuta 1 State Senior High School',
    status: 'Graduated',
    logo: smansakuLogo,
  },
  {
    level: 'Junior High School',
    institution: 'Kuta 1 State Junior High School',
    status: 'Graduated',
    logo: onekutaLogo,
  },
  {
    level: 'Elementary School',
    institution: 'Kuta 1 State Elementary School',
    status: 'Graduated',
    logo: sdonekutaLogo,
  },
];

export default function Education({ isDark }) {
  const cardClass = isDark
    ? 'border-neutral-800 bg-neutral-950/40 hover:border-neutral-700'
    : 'border-neutral-200 bg-neutral-50/80 hover:border-neutral-400';

  const titleClass = isDark ? 'text-white' : 'text-black';
  const subClass = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const badgeClass = isDark
    ? 'border-neutral-800 bg-neutral-900 text-neutral-300'
    : 'border-neutral-300 bg-neutral-200 text-neutral-800';

  return (
    <section id="education" className="scroll-mt-24 py-12">
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
          03 / Education
        </span>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Academic Journey
        </h2>
      </div>

      <div className="space-y-5">
        {educationList.map((edu) => (
          <div
            key={edu.institution}
            className={`group flex flex-col justify-between gap-5 rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-0.5 sm:p-7 sm:flex-row sm:items-center ${cardClass}`}
          >
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-200/80 bg-white p-2 shadow-sm">
                <img
                  src={edu.logo}
                  alt={`Logo ${edu.institution}`}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="space-y-0.5">
                <span className="text-xs font-medium text-neutral-500 sm:text-sm">
                  {edu.level}
                </span>
                <h3 className={`text-lg font-semibold sm:text-xl ${titleClass}`}>
                  {edu.institution}
                </h3>
                {edu.major && (
                  <p className={`text-sm sm:text-base ${subClass}`}>
                    {edu.major}
                  </p>
                )}
              </div>
            </div>

            <div className="self-start sm:self-center">
              <span className={`rounded-full border px-4 py-1.5 text-xs font-medium sm:text-sm ${badgeClass}`}>
                {edu.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
