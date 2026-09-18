import { formatNumber } from '../../utils/matrixMath';

export default function MatrixResult({
  result,
  isDark,
  onCopyResultToA,
}) {
  const cardBg = isDark
    ? 'bg-neutral-900/80 border-neutral-800 text-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.5)]'
    : 'bg-neutral-50/95 border-neutral-200 text-neutral-900 shadow-[0_4px_20px_rgba(0,0,0,0.08)]';

  const bracketColor = isDark ? 'border-cyan-400' : 'border-blue-600';

  const btnAction = isDark
    ? 'border-cyan-400/70 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 active:scale-95'
    : 'border-blue-600 bg-blue-50 text-blue-700 hover:bg-blue-100 active:scale-95';

  if (!result) {
    return (
      <div className={`flex flex-col items-center justify-center rounded-2xl border border-dashed p-8 text-center transition-colors duration-300 ${
        isDark ? 'border-neutral-800 bg-neutral-900/40 text-neutral-400' : 'border-neutral-300 bg-white/60 text-neutral-500'
      }`}>
        <div className="mb-2 text-2xl" aria-hidden="true">
          ⚡
        </div>
        <h4 className="text-base font-semibold">
          Belum Ada Hasil Kalkulasi
        </h4>
        <p className="mt-1 max-w-sm text-xs sm:text-sm">
          Masukkan angka pada Matriks A dan B di atas, kemudian pilih tombol operasi matematika yang diinginkan.
        </p>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col rounded-2xl border p-5 sm:p-6 backdrop-blur-md transition-colors duration-300 ${cardBg}`}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-700/30 pb-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-500 dark:text-cyan-400">
            Output Perhitungan
          </span>
          <h3 className="text-lg font-bold sm:text-xl">
            {result.label}
          </h3>
        </div>

        {result.type === 'matrix' && (
          <button
            type="button"
            onClick={() => onCopyResultToA(result.data)}
            className={`flex min-h-11 items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-semibold transition-all ${btnAction}`}
          >
            <span>Salin Hasil ke Matriks A</span>
          </button>
        )}
      </div>

      {/* Error state */}
      {result.type === 'error' && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-500 dark:text-red-400"
        >
          <div className="flex items-center gap-2 font-semibold">
            <span aria-hidden="true">⚠️</span>
            <span>Gagal Menghitung:</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-red-600 dark:text-red-300">
            {result.message}
          </p>
        </div>
      )}

      {/* Scalar result (e.g. Determinant) */}
      {result.type === 'scalar' && (
        <div className="flex flex-col items-center justify-center py-6">
          <div className={`rounded-2xl border px-8 py-6 text-center ${
            isDark ? 'border-neutral-700 bg-black/60' : 'border-neutral-200 bg-white shadow-sm'
          }`}>
            <span className={`text-xs uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Nilai Skalar
            </span>
            <div className="mt-2 font-mono text-3xl sm:text-4xl font-extrabold text-cyan-500 dark:text-cyan-400">
              {formatNumber(result.value)}
            </div>
          </div>
        </div>
      )}

      {/* Matrix result */}
      {result.type === 'matrix' && (
        <div className="my-auto flex items-center justify-center py-4">
          <div className="relative flex items-center px-4 py-2">
            {/* Left Bracket */}
            <div
              aria-hidden="true"
              className={`h-full w-3 sm:w-4 border-l-2 border-t-2 border-b-2 rounded-l-md ${bracketColor}`}
            />

            {/* Matrix Grid */}
            <div
              className={`grid gap-2.5 sm:gap-3 px-3 sm:px-4 ${
                result.data.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
              }`}
            >
              {result.data.map((row, rIdx) =>
                row.map((val, cIdx) => (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    className={`flex h-11 min-w-16 sm:h-12 sm:min-w-20 items-center justify-center rounded-lg border px-2 font-mono text-sm sm:text-base font-semibold ${
                      isDark
                        ? 'border-neutral-700/80 bg-black/60 text-cyan-300'
                        : 'border-neutral-300 bg-white text-blue-700 shadow-sm'
                    }`}
                  >
                    {formatNumber(val)}
                  </div>
                ))
              )}
            </div>

            {/* Right Bracket */}
            <div
              aria-hidden="true"
              className={`h-full w-3 sm:w-4 border-r-2 border-t-2 border-b-2 rounded-r-md ${bracketColor}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
