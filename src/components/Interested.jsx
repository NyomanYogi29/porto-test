const interests = [
  {
    title: 'Backend Development',
    category: 'Core Focus',
    description:
      'Designing robust server-side applications, building efficient REST APIs, and modeling performant databases.',
  },
  {
    title: 'Artificial Intelligence',
    category: 'Exploration',
    description:
      'Understanding fundamental machine learning concepts, intelligent agents, and data-driven problem solving.',
  },
  {
    title: 'System Languages',
    category: 'Currently Learning',
    description:
      'Exploring lower-level languages to deepen understanding of memory, performance, and runtime execution.',
  },
  {
    title: 'Backend Architecture',
    category: 'Engineering',
    description:
      'Studying scalable system structures, distributed services, caching layers, and high-reliability design.',
  },
];

export default function Interested({ isDark }) {
  const cardClass = isDark
    ? 'border-neutral-800 bg-neutral-950/40 hover:border-neutral-700'
    : 'border-neutral-200 bg-neutral-50/80 hover:border-neutral-400';

  const titleClass = isDark ? 'text-white' : 'text-black';
  const descClass = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const tagClass = isDark
    ? 'border-neutral-800 bg-neutral-900 text-neutral-400'
    : 'border-neutral-300 bg-neutral-200 text-neutral-700';

  return (
    <section id="interested" className="scroll-mt-24 py-12">
      <div className="mb-6 flex flex-col gap-2">
        <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
          02 / Interested In
        </span>
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Passions & Focus Areas
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {interests.map((item) => (
          <div
            key={item.title}
            className={`rounded-xl border p-6 transition-all duration-200 hover:-translate-y-0.5 ${cardClass}`}
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className={`text-lg font-semibold tracking-tight ${titleClass}`}>
                {item.title}
              </h3>
              <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tagClass}`}>
                {item.category}
              </span>
            </div>
            <p className={`mt-3 text-sm leading-relaxed ${descClass}`}>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
