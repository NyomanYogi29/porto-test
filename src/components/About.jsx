import myFace from '../assets/my-face.jpg';

export default function About({ isDark }) {
  const containerClass = isDark
    ? 'border-neutral-800 bg-neutral-950/40 text-neutral-100'
    : 'border-neutral-200 bg-neutral-50/80 text-neutral-900';

  const subtitleClass = isDark ? 'text-neutral-400' : 'text-neutral-600';
  const bodyClass = isDark ? 'text-neutral-300' : 'text-neutral-700';
  const hrClass = isDark ? 'border-neutral-800' : 'border-neutral-200';
  const photoAuraClass = isDark
    ? 'border-neutral-700/80 shadow-[0_0_25px_rgba(0,0,0,0.95),0_0_15px_rgba(255,255,255,0.14)] hover:shadow-[0_0_35px_rgba(0,0,0,1),0_0_22px_rgba(255,255,255,0.25)]'
    : 'border-neutral-300 shadow-[0_0_25px_rgba(255,255,255,0.95),0_0_15px_rgba(0,0,0,0.08)] hover:shadow-[0_0_35px_rgba(255,255,255,1),0_0_22px_rgba(0,0,0,0.15)]';
  const photoFilterClass = isDark
    ? 'grayscale group-hover:grayscale-0'
    : 'grayscale-0 group-hover:grayscale';

  return (
    <section id="about" className="scroll-mt-24 py-12">
      <div className={`rounded-2xl border p-8 transition-colors duration-300 sm:p-10 ${containerClass}`}>
        <div className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row md:items-start">
          <div className="flex flex-1 flex-col gap-4">
            <span className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
              01 / About Me
            </span>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Nyoman Yogi
            </h1>

            <p className={`text-base font-medium sm:text-lg ${subtitleClass}`}>
              Computer Science Student at Ganesha University of Education
            </p>

            <hr className={`my-2 border-t ${hrClass}`} />

            <p className={`text-base leading-relaxed text-justify ${bodyClass}`}>
              Hi, my name is Nyoman Yogi; I am 20 years old and passionate about programming.
              I started my programming journey during the COVID-19 pandemic and am still going strong!
              In the programming world, I lean towards backend and database engineering,
              and I am currently exploring artificial intelligence and systems programming languages.
            </p>
          </div>

          <div className="w-full shrink-0 sm:w-auto">
            <div className="group relative mx-auto w-52 sm:w-64 md:w-60 lg:w-72">
              <div
                aria-hidden="true"
                className={`absolute -inset-2 rounded-3xl opacity-50 blur-lg transition-opacity duration-500 group-hover:opacity-90 ${
                  isDark ? 'bg-white/10 shadow-black' : 'bg-black/10 shadow-white'
                }`}
              />
              <div
                className={`relative overflow-hidden rounded-2xl border transition-all duration-500 ${photoAuraClass}`}
              >
                <img
                  src={myFace}
                  alt="Foto Profil Nyoman Yogi"
                  className={`aspect-[4/5] w-full object-cover contrast-105 transition-all duration-500 group-hover:scale-105 ${photoFilterClass}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
