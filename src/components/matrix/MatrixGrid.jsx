export default function MatrixGrid({
  title,
  matrix,
  size,
  isDark,
  onCellChange,
  onSizeChange,
  onRandomize,
  onClear,
}) {
  const cardBg = isDark
    ? 'bg-neutral-900/75 border-neutral-800 text-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
    : 'bg-neutral-50/90 border-neutral-200 text-neutral-900 shadow-[0_4px_16px_rgba(0,0,0,0.06)]';

  const inputClass = isDark
    ? 'bg-black/70 border-neutral-700 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 focus:outline-none'
    : 'bg-white border-neutral-300 text-black focus:border-blue-600 focus:ring-2 focus:ring-blue-600/30 focus:outline-none';

  const bracketColor = isDark ? 'border-cyan-400/70' : 'border-neutral-700';

  const btnSecondary = isDark
    ? 'border-neutral-700 bg-neutral-800/80 text-neutral-200 hover:bg-neutral-700 hover:text-white'
    : 'border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 hover:text-black';

  const btnActive = isDark
    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 font-semibold shadow-[0_0_12px_rgba(34,211,238,0.25)]'
    : 'border-blue-600 bg-blue-50 text-blue-700 font-semibold';

  return (
    <div className={`relative flex flex-col rounded-2xl border p-5 sm:p-6 backdrop-blur-md transition-colors duration-300 ${cardBg}`}>
      {/* Header controls: Title & Dimension Selector */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold tracking-wide sm:text-xl">
          {title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium">
          <span className={`mr-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Ordo:
          </span>
          <button
            type="button"
            onClick={() => onSizeChange(2)}
            className={`min-h-9 min-w-11 cursor-pointer rounded-lg border px-3 py-1 text-xs transition-all duration-150 active:scale-95 ${
              size === 2 ? btnActive : btnSecondary
            }`}
          >
            2x2
          </button>
          <button
            type="button"
            onClick={() => onSizeChange(3)}
            className={`min-h-9 min-w-11 cursor-pointer rounded-lg border px-3 py-1 text-xs transition-all duration-150 active:scale-95 ${
              size === 3 ? btnActive : btnSecondary
            }`}
          >
            3x3
          </button>
        </div>
      </div>

      {/* Mathematical Matrix Representation with visual brackets */}
      <div className="my-auto flex items-center justify-center py-4">
        <div className="relative flex items-center px-3 py-2">
          {/* Left Bracket */}
          <div
            aria-hidden="true"
            className={`h-full w-2.5 sm:w-3.5 border-l-2 border-t-2 border-b-2 rounded-l-md ${bracketColor}`}
          />

          {/* Grid Cells */}
          <div
            className={`grid gap-2 sm:gap-3 px-2 sm:px-3 ${
              size === 2 ? 'grid-cols-2' : 'grid-cols-3'
            }`}
          >
            {matrix.map((row, rowIndex) =>
              row.map((cellValue, colIndex) => {
                const inputId = `${title}-cell-${rowIndex}-${colIndex}`.toLowerCase().replace(/\s+/g, '-');
                return (
                  <div key={`${rowIndex}-${colIndex}`} className="relative">
                    <input
                      id={inputId}
                      type="number"
                      step="any"
                      aria-label={`${title} baris ${rowIndex + 1} kolom ${colIndex + 1}`}
                      value={cellValue}
                      onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
                      className={`h-11 w-14 sm:h-12 sm:w-16 rounded-lg border text-center font-mono text-sm sm:text-base font-medium transition-all ${inputClass}`}
                    />
                  </div>
                );
              })
            )}
          </div>

          {/* Right Bracket */}
          <div
            aria-hidden="true"
            className={`h-full w-2.5 sm:w-3.5 border-r-2 border-t-2 border-b-2 rounded-r-md ${bracketColor}`}
          />
        </div>
      </div>

      {/* Quick Matrix Action Buttons */}
      <div className="mt-4 flex items-center justify-end gap-2 pt-2 border-t border-neutral-700/30">
        <button
          type="button"
          onClick={onRandomize}
          className={`flex min-h-11 items-center justify-center rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 ${btnSecondary}`}
        >
          Acak Nilai
        </button>
        <button
          type="button"
          onClick={onClear}
          className={`flex min-h-11 items-center justify-center rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95 ${btnSecondary}`}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
